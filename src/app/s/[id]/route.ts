import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const snippetId = id.replace('.js', '')

  const script = `
(function() {
  'use strict';

  var SNIPPET_ID = '${snippetId}';
  var API_URL = '${request.nextUrl.origin}/api/register';

  // Wait for the page to fully load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Check if WebMCP is supported
    if (!navigator.modelContext) {
      console.log('[AgentGate] WebMCP not supported in this browser. Tools registered for future compatibility.');
      registerFallbackTools();
      return;
    }

    var forms = document.querySelectorAll('form');
    var tools = [];

    forms.forEach(function(form, index) {
      var tool = buildToolFromForm(form, index);
      if (tool) {
        tools.push(tool);
        try {
          navigator.modelContext.registerTool(tool);
        } catch(e) {
          console.warn('[AgentGate] Failed to register tool:', tool.name, e);
        }
      }
    });

    if (tools.length > 0) {
      console.log('[AgentGate] Registered ' + tools.length + ' WebMCP tool(s)');
      reportTools(tools);
    } else {
      console.log('[AgentGate] No forms found to register');
    }
  }

  function buildToolFromForm(form, index) {
    // Skip forms that already have WebMCP annotations
    if (form.getAttribute('toolname')) return null;

    var formName = form.getAttribute('name') || form.getAttribute('id') || form.getAttribute('action') || 'form_' + index;
    var cleanName = formName.replace(/[^a-zA-Z0-9_]/g, '_').replace(/^_+|_+$/g, '').toLowerCase();
    if (!cleanName) cleanName = 'form_' + index;

    var inputs = form.querySelectorAll('input, select, textarea');
    var properties = {};
    var required = [];

    inputs.forEach(function(input) {
      var type = input.type || 'text';
      if (type === 'submit' || type === 'button' || type === 'hidden' || type === 'reset') return;

      var name = input.name || input.id;
      if (!name) return;

      var label = getLabel(input);
      var prop = { type: 'string' };

      if (type === 'number' || type === 'range') {
        prop.type = 'number';
        if (input.min) prop.minimum = Number(input.min);
        if (input.max) prop.maximum = Number(input.max);
      } else if (type === 'email') {
        prop.type = 'string';
        prop.description = (label || name) + ' (email address)';
      } else if (type === 'tel') {
        prop.type = 'string';
        prop.description = (label || name) + ' (phone number)';
      } else if (type === 'date' || type === 'datetime-local') {
        prop.type = 'string';
        prop.description = (label || name) + ' (date format: YYYY-MM-DD)';
      } else if (type === 'checkbox') {
        prop.type = 'boolean';
      } else if (input.tagName === 'SELECT') {
        var options = Array.from(input.options).filter(function(o) { return o.value; });
        if (options.length > 0) {
          prop.enum = options.map(function(o) { return o.value; });
          prop.description = (label || name) + ' - Options: ' + options.map(function(o) { return o.text; }).join(', ');
        }
      } else if (input.tagName === 'TEXTAREA') {
        prop.type = 'string';
        prop.description = (label || name) + ' (multi-line text)';
      }

      if (!prop.description) {
        prop.description = label || name;
      }

      properties[name] = prop;

      if (input.required) {
        required.push(name);
      }
    });

    if (Object.keys(properties).length === 0) return null;

    var description = inferFormPurpose(form, cleanName);

    return {
      name: cleanName,
      description: description,
      inputSchema: {
        type: 'object',
        properties: properties,
        required: required.length > 0 ? required : undefined
      },
      execute: function(params) {
        return fillAndHighlightForm(form, params);
      }
    };
  }

  function getLabel(input) {
    // Check for associated label
    if (input.id) {
      var label = document.querySelector('label[for="' + input.id + '"]');
      if (label) return label.textContent.trim();
    }
    // Check for wrapping label
    var parent = input.closest('label');
    if (parent) {
      var text = parent.textContent.trim();
      var inputText = input.value || '';
      return text.replace(inputText, '').trim();
    }
    // Use placeholder or aria-label
    return input.placeholder || input.getAttribute('aria-label') || '';
  }

  function inferFormPurpose(form, name) {
    var text = (form.textContent || '').toLowerCase();
    var action = (form.action || '').toLowerCase();
    var html = form.innerHTML.toLowerCase();

    if (text.includes('contact') || name.includes('contact')) {
      return 'Submit a contact inquiry to this business';
    }
    if (text.includes('book') || text.includes('appointment') || text.includes('schedule')) {
      return 'Book an appointment or schedule a meeting';
    }
    if (text.includes('subscribe') || text.includes('newsletter') || text.includes('email list')) {
      return 'Subscribe to the newsletter or mailing list';
    }
    if (text.includes('search') || text.includes('find')) {
      return 'Search or find information on this website';
    }
    if (text.includes('login') || text.includes('sign in')) {
      return 'Sign in to an account (requires existing credentials)';
    }
    if (text.includes('register') || text.includes('sign up') || text.includes('create account')) {
      return 'Create a new account';
    }
    if (text.includes('quote') || text.includes('estimate')) {
      return 'Request a quote or estimate';
    }
    if (text.includes('review') || text.includes('feedback') || text.includes('testimonial')) {
      return 'Submit a review or feedback';
    }
    if (action.includes('search') || html.includes('type="search"')) {
      return 'Search this website';
    }

    return 'Interact with the ' + name.replace(/_/g, ' ') + ' form on this website';
  }

  function fillAndHighlightForm(form, params) {
    Object.keys(params).forEach(function(key) {
      var input = form.querySelector('[name="' + key + '"]');
      if (!input) input = form.querySelector('#' + key);
      if (!input) return;

      if (input.type === 'checkbox') {
        input.checked = Boolean(params[key]);
      } else if (input.tagName === 'SELECT') {
        input.value = params[key];
      } else {
        input.value = params[key];
      }

      // Trigger change events
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });

    // Scroll to form
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Highlight form
    form.style.outline = '2px solid #0a84ff';
    form.style.outlineOffset = '4px';
    form.style.borderRadius = '12px';

    setTimeout(function() {
      form.style.outline = '';
      form.style.outlineOffset = '';
    }, 5000);

    return {
      content: [{
        type: 'text',
        text: 'Form fields populated. The form is highlighted and ready for user review and submission.'
      }]
    };
  }

  function registerFallbackTools() {
    // Even without WebMCP support, register tools data for the directory
    var forms = document.querySelectorAll('form');
    var tools = [];
    forms.forEach(function(form, index) {
      var tool = buildToolFromForm(form, index);
      if (tool) {
        tools.push({ name: tool.name, description: tool.description });
      }
    });
    if (tools.length > 0) {
      reportTools(tools);
    }
  }

  function reportTools(tools) {
    var toolData = tools.map(function(t) {
      return { name: t.name, description: t.description };
    });

    try {
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ snippet_id: SNIPPET_ID, tools: toolData })
      });
    } catch(e) {
      // Silent fail — don't break the host site
    }
  }
})();
`.trim()

  return new NextResponse(script, {
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
