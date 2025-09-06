'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var lucideReact = require('lucide-react');

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production = {};

/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production;

function requireReactJsxRuntime_production () {
	if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
	hasRequiredReactJsxRuntime_production = 1;
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
	  var key = null;
	  void 0 !== maybeKey && (key = "" + maybeKey);
	  void 0 !== config.key && (key = "" + config.key);
	  if ("key" in config) {
	    maybeKey = {};
	    for (var propName in config)
	      "key" !== propName && (maybeKey[propName] = config[propName]);
	  } else maybeKey = config;
	  config = maybeKey.ref;
	  return {
	    $$typeof: REACT_ELEMENT_TYPE,
	    type: type,
	    key: key,
	    ref: void 0 !== config ? config : null,
	    props: maybeKey
	  };
	}
	reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
	reactJsxRuntime_production.jsx = jsxProd;
	reactJsxRuntime_production.jsxs = jsxProd;
	return reactJsxRuntime_production;
}

var reactJsxRuntime_development = {};

/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_development;

function requireReactJsxRuntime_development () {
	if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
	hasRequiredReactJsxRuntime_development = 1;
	"production" !== process.env.NODE_ENV &&
	  (function () {
	    function getComponentNameFromType(type) {
	      if (null == type) return null;
	      if ("function" === typeof type)
	        return type.$$typeof === REACT_CLIENT_REFERENCE
	          ? null
	          : type.displayName || type.name || null;
	      if ("string" === typeof type) return type;
	      switch (type) {
	        case REACT_FRAGMENT_TYPE:
	          return "Fragment";
	        case REACT_PROFILER_TYPE:
	          return "Profiler";
	        case REACT_STRICT_MODE_TYPE:
	          return "StrictMode";
	        case REACT_SUSPENSE_TYPE:
	          return "Suspense";
	        case REACT_SUSPENSE_LIST_TYPE:
	          return "SuspenseList";
	        case REACT_ACTIVITY_TYPE:
	          return "Activity";
	      }
	      if ("object" === typeof type)
	        switch (
	          ("number" === typeof type.tag &&
	            console.error(
	              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
	            ),
	          type.$$typeof)
	        ) {
	          case REACT_PORTAL_TYPE:
	            return "Portal";
	          case REACT_CONTEXT_TYPE:
	            return (type.displayName || "Context") + ".Provider";
	          case REACT_CONSUMER_TYPE:
	            return (type._context.displayName || "Context") + ".Consumer";
	          case REACT_FORWARD_REF_TYPE:
	            var innerType = type.render;
	            type = type.displayName;
	            type ||
	              ((type = innerType.displayName || innerType.name || ""),
	              (type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef"));
	            return type;
	          case REACT_MEMO_TYPE:
	            return (
	              (innerType = type.displayName || null),
	              null !== innerType
	                ? innerType
	                : getComponentNameFromType(type.type) || "Memo"
	            );
	          case REACT_LAZY_TYPE:
	            innerType = type._payload;
	            type = type._init;
	            try {
	              return getComponentNameFromType(type(innerType));
	            } catch (x) {}
	        }
	      return null;
	    }
	    function testStringCoercion(value) {
	      return "" + value;
	    }
	    function checkKeyStringCoercion(value) {
	      try {
	        testStringCoercion(value);
	        var JSCompiler_inline_result = !1;
	      } catch (e) {
	        JSCompiler_inline_result = !0;
	      }
	      if (JSCompiler_inline_result) {
	        JSCompiler_inline_result = console;
	        var JSCompiler_temp_const = JSCompiler_inline_result.error;
	        var JSCompiler_inline_result$jscomp$0 =
	          ("function" === typeof Symbol &&
	            Symbol.toStringTag &&
	            value[Symbol.toStringTag]) ||
	          value.constructor.name ||
	          "Object";
	        JSCompiler_temp_const.call(
	          JSCompiler_inline_result,
	          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
	          JSCompiler_inline_result$jscomp$0
	        );
	        return testStringCoercion(value);
	      }
	    }
	    function getTaskName(type) {
	      if (type === REACT_FRAGMENT_TYPE) return "<>";
	      if (
	        "object" === typeof type &&
	        null !== type &&
	        type.$$typeof === REACT_LAZY_TYPE
	      )
	        return "<...>";
	      try {
	        var name = getComponentNameFromType(type);
	        return name ? "<" + name + ">" : "<...>";
	      } catch (x) {
	        return "<...>";
	      }
	    }
	    function getOwner() {
	      var dispatcher = ReactSharedInternals.A;
	      return null === dispatcher ? null : dispatcher.getOwner();
	    }
	    function UnknownOwner() {
	      return Error("react-stack-top-frame");
	    }
	    function hasValidKey(config) {
	      if (hasOwnProperty.call(config, "key")) {
	        var getter = Object.getOwnPropertyDescriptor(config, "key").get;
	        if (getter && getter.isReactWarning) return !1;
	      }
	      return void 0 !== config.key;
	    }
	    function defineKeyPropWarningGetter(props, displayName) {
	      function warnAboutAccessingKey() {
	        specialPropKeyWarningShown ||
	          ((specialPropKeyWarningShown = !0),
	          console.error(
	            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
	            displayName
	          ));
	      }
	      warnAboutAccessingKey.isReactWarning = !0;
	      Object.defineProperty(props, "key", {
	        get: warnAboutAccessingKey,
	        configurable: !0
	      });
	    }
	    function elementRefGetterWithDeprecationWarning() {
	      var componentName = getComponentNameFromType(this.type);
	      didWarnAboutElementRef[componentName] ||
	        ((didWarnAboutElementRef[componentName] = !0),
	        console.error(
	          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
	        ));
	      componentName = this.props.ref;
	      return void 0 !== componentName ? componentName : null;
	    }
	    function ReactElement(
	      type,
	      key,
	      self,
	      source,
	      owner,
	      props,
	      debugStack,
	      debugTask
	    ) {
	      self = props.ref;
	      type = {
	        $$typeof: REACT_ELEMENT_TYPE,
	        type: type,
	        key: key,
	        props: props,
	        _owner: owner
	      };
	      null !== (void 0 !== self ? self : null)
	        ? Object.defineProperty(type, "ref", {
	            enumerable: !1,
	            get: elementRefGetterWithDeprecationWarning
	          })
	        : Object.defineProperty(type, "ref", { enumerable: !1, value: null });
	      type._store = {};
	      Object.defineProperty(type._store, "validated", {
	        configurable: !1,
	        enumerable: !1,
	        writable: !0,
	        value: 0
	      });
	      Object.defineProperty(type, "_debugInfo", {
	        configurable: !1,
	        enumerable: !1,
	        writable: !0,
	        value: null
	      });
	      Object.defineProperty(type, "_debugStack", {
	        configurable: !1,
	        enumerable: !1,
	        writable: !0,
	        value: debugStack
	      });
	      Object.defineProperty(type, "_debugTask", {
	        configurable: !1,
	        enumerable: !1,
	        writable: !0,
	        value: debugTask
	      });
	      Object.freeze && (Object.freeze(type.props), Object.freeze(type));
	      return type;
	    }
	    function jsxDEVImpl(
	      type,
	      config,
	      maybeKey,
	      isStaticChildren,
	      source,
	      self,
	      debugStack,
	      debugTask
	    ) {
	      var children = config.children;
	      if (void 0 !== children)
	        if (isStaticChildren)
	          if (isArrayImpl(children)) {
	            for (
	              isStaticChildren = 0;
	              isStaticChildren < children.length;
	              isStaticChildren++
	            )
	              validateChildKeys(children[isStaticChildren]);
	            Object.freeze && Object.freeze(children);
	          } else
	            console.error(
	              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
	            );
	        else validateChildKeys(children);
	      if (hasOwnProperty.call(config, "key")) {
	        children = getComponentNameFromType(type);
	        var keys = Object.keys(config).filter(function (k) {
	          return "key" !== k;
	        });
	        isStaticChildren =
	          0 < keys.length
	            ? "{key: someKey, " + keys.join(": ..., ") + ": ...}"
	            : "{key: someKey}";
	        didWarnAboutKeySpread[children + isStaticChildren] ||
	          ((keys =
	            0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}"),
	          console.error(
	            'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
	            isStaticChildren,
	            children,
	            keys,
	            children
	          ),
	          (didWarnAboutKeySpread[children + isStaticChildren] = !0));
	      }
	      children = null;
	      void 0 !== maybeKey &&
	        (checkKeyStringCoercion(maybeKey), (children = "" + maybeKey));
	      hasValidKey(config) &&
	        (checkKeyStringCoercion(config.key), (children = "" + config.key));
	      if ("key" in config) {
	        maybeKey = {};
	        for (var propName in config)
	          "key" !== propName && (maybeKey[propName] = config[propName]);
	      } else maybeKey = config;
	      children &&
	        defineKeyPropWarningGetter(
	          maybeKey,
	          "function" === typeof type
	            ? type.displayName || type.name || "Unknown"
	            : type
	        );
	      return ReactElement(
	        type,
	        children,
	        self,
	        source,
	        getOwner(),
	        maybeKey,
	        debugStack,
	        debugTask
	      );
	    }
	    function validateChildKeys(node) {
	      "object" === typeof node &&
	        null !== node &&
	        node.$$typeof === REACT_ELEMENT_TYPE &&
	        node._store &&
	        (node._store.validated = 1);
	    }
	    var React$1 = React,
	      REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	      REACT_PORTAL_TYPE = Symbol.for("react.portal"),
	      REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
	      REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
	      REACT_PROFILER_TYPE = Symbol.for("react.profiler");
	    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),
	      REACT_CONTEXT_TYPE = Symbol.for("react.context"),
	      REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
	      REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
	      REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"),
	      REACT_MEMO_TYPE = Symbol.for("react.memo"),
	      REACT_LAZY_TYPE = Symbol.for("react.lazy"),
	      REACT_ACTIVITY_TYPE = Symbol.for("react.activity"),
	      REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"),
	      ReactSharedInternals =
	        React$1.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
	      hasOwnProperty = Object.prototype.hasOwnProperty,
	      isArrayImpl = Array.isArray,
	      createTask = console.createTask
	        ? console.createTask
	        : function () {
	            return null;
	          };
	    React$1 = {
	      react_stack_bottom_frame: function (callStackForError) {
	        return callStackForError();
	      }
	    };
	    var specialPropKeyWarningShown;
	    var didWarnAboutElementRef = {};
	    var unknownOwnerDebugStack = React$1.react_stack_bottom_frame.bind(
	      React$1,
	      UnknownOwner
	    )();
	    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
	    var didWarnAboutKeySpread = {};
	    reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
	    reactJsxRuntime_development.jsx = function (type, config, maybeKey, source, self) {
	      var trackActualOwner =
	        1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
	      return jsxDEVImpl(
	        type,
	        config,
	        maybeKey,
	        !1,
	        source,
	        self,
	        trackActualOwner
	          ? Error("react-stack-top-frame")
	          : unknownOwnerDebugStack,
	        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
	      );
	    };
	    reactJsxRuntime_development.jsxs = function (type, config, maybeKey, source, self) {
	      var trackActualOwner =
	        1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
	      return jsxDEVImpl(
	        type,
	        config,
	        maybeKey,
	        !0,
	        source,
	        self,
	        trackActualOwner
	          ? Error("react-stack-top-frame")
	          : unknownOwnerDebugStack,
	        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
	      );
	    };
	  })();
	return reactJsxRuntime_development;
}

if (process.env.NODE_ENV === 'production') {
  jsxRuntime.exports = requireReactJsxRuntime_production();
} else {
  jsxRuntime.exports = requireReactJsxRuntime_development();
}

var jsxRuntimeExports = jsxRuntime.exports;

function useVoiceRecognition() {
    const [isListening, setIsListening] = React.useState(false);
    const [transcript, setTranscript] = React.useState('');
    const [error, setError] = React.useState(null);
    const [recognition, setRecognition] = React.useState(null);
    const isSupported = typeof window !== 'undefined' &&
        (window.SpeechRecognition || window.webkitSpeechRecognition);
    React.useEffect(() => {
        if (!isSupported)
            return;
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = 'en-US';
        recognitionInstance.onstart = () => {
            setIsListening(true);
            setError(null);
        };
        recognitionInstance.onresult = (event) => {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                }
            }
            setTranscript(prev => prev + finalTranscript);
        };
        recognitionInstance.onerror = (event) => {
            setError(event.error);
            setIsListening(false);
        };
        recognitionInstance.onend = () => {
            setIsListening(false);
        };
        setRecognition(recognitionInstance);
        return () => {
            if (recognitionInstance) {
                recognitionInstance.stop();
            }
        };
    }, [isSupported]);
    const startListening = React.useCallback(() => {
        if (recognition && !isListening) {
            try {
                recognition.start();
            }
            catch (err) {
                setError('Failed to start voice recognition');
            }
        }
    }, [recognition, isListening]);
    const stopListening = React.useCallback(() => {
        if (recognition && isListening) {
            try {
                recognition.stop();
            }
            catch (err) {
                setError('Failed to stop voice recognition');
            }
        }
    }, [recognition, isListening]);
    const resetTranscript = React.useCallback(() => {
        setTranscript('');
    }, []);
    return {
        isListening,
        isSupported,
        startListening,
        stopListening,
        transcript,
        error,
        resetTranscript,
    };
}

function useFileUpload(acceptedTypes = ['*'], maxSize = 10 * 1024 * 1024 // 10MB default
) {
    const [files, setFiles] = React.useState([]);
    const [isUploading, setIsUploading] = React.useState(false);
    const [uploadProgress, setUploadProgress] = React.useState(0);
    const validateFile = React.useCallback((file) => {
        // Check file type
        if (acceptedTypes.length > 0 && !acceptedTypes.includes('*')) {
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
            const mimeType = file.type;
            const isValidType = acceptedTypes.some(type => {
                if (type.startsWith('.')) {
                    return fileExtension === type.slice(1);
                }
                if (type.includes('/')) {
                    return mimeType === type;
                }
                return fileExtension === type;
            });
            if (!isValidType) {
                return `File type ${file.type} is not supported. Accepted types: ${acceptedTypes.join(', ')}`;
            }
        }
        // Check file size
        if (file.size > maxSize) {
            const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
            return `File size ${(file.size / (1024 * 1024)).toFixed(1)}MB exceeds maximum size of ${maxSizeMB}MB`;
        }
        return null;
    }, [acceptedTypes, maxSize]);
    const addFiles = React.useCallback((newFiles) => {
        const fileArray = Array.from(newFiles);
        const validFiles = [];
        const errors = [];
        fileArray.forEach(file => {
            const error = validateFile(file);
            if (error) {
                errors.push(`${file.name}: ${error}`);
            }
            else {
                validFiles.push(file);
            }
        });
        if (errors.length > 0) {
            console.warn('File validation errors:', errors);
        }
        setFiles(prev => [...prev, ...validFiles]);
    }, [validateFile]);
    const removeFile = React.useCallback((index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    }, []);
    const clearFiles = React.useCallback(() => {
        setFiles([]);
    }, []);
    const updateUploadProgress = React.useCallback((progress) => {
        setUploadProgress(progress);
    }, []);
    const startUpload = React.useCallback(() => {
        setIsUploading(true);
        setUploadProgress(0);
    }, []);
    const finishUpload = React.useCallback(() => {
        setIsUploading(false);
        setUploadProgress(100);
    }, []);
    return {
        files,
        addFiles,
        removeFile,
        clearFiles,
        isUploading,
        uploadProgress,
        updateUploadProgress,
        startUpload,
        finishUpload,
        validateFile,
    };
}

class AIServiceManager {
    constructor() {
        this.providers = new Map();
        // Initialize with default providers
        this.initializeDefaultProviders();
    }
    initializeDefaultProviders() {
        // OpenAI
        this.providers.set('openai', {
            name: 'OpenAI',
            model: 'gpt-3.5-turbo',
            maxTokens: 1000,
            temperature: 0.1
        });
        // Anthropic
        this.providers.set('anthropic', {
            name: 'Anthropic',
            model: 'claude-3-haiku-20240307',
            maxTokens: 1000,
            temperature: 0.1
        });
        // Mistral Cloud
        this.providers.set('mistral', {
            name: 'Mistral Cloud',
            model: 'mistral-large-latest',
            maxTokens: 1000,
            temperature: 0.1
        });
        // LM Studio
        this.providers.set('lmstudio', {
            name: 'LM Studio',
            endpoint: 'http://localhost:1234/v1/chat/completions',
            model: 'openai/gpt-oss-20b',
            maxTokens: 1000,
            temperature: 0.1
        });
        // Ollama
        this.providers.set('ollama', {
            name: 'Ollama',
            endpoint: 'http://localhost:11434/api/generate',
            model: 'mixtral',
            maxTokens: 1000,
            temperature: 0.1
        });
        // Google Gemini
        this.providers.set('gemini', {
            name: 'Google Gemini',
            model: 'gemini-pro',
            maxTokens: 1000,
            temperature: 0.1
        });
    }
    /**
     * Configure a provider with API key or endpoint
     */
    configureProvider(providerId, config) {
        const existing = this.providers.get(providerId);
        if (existing) {
            this.providers.set(providerId, { ...existing, ...config });
        }
        else {
            this.providers.set(providerId, {
                name: providerId,
                ...config
            });
        }
    }
    /**
     * Get available providers
     */
    getAvailableProviders() {
        return Array.from(this.providers.keys());
    }
    /**
     * Check if a provider is properly configured
     */
    isProviderConfigured(providerId) {
        const provider = this.providers.get(providerId);
        if (!provider)
            return false;
        // Check if provider has required configuration
        switch (providerId) {
            case 'openai':
            case 'anthropic':
            case 'mistral':
            case 'gemini':
                return !!provider.apiKey;
            case 'lmstudio':
            case 'ollama':
                return !!provider.endpoint;
            default:
                return false;
        }
    }
    /**
     * Process text with the specified AI provider
     */
    async processText(providerId, text, files, options = {}) {
        const provider = this.providers.get(providerId);
        if (!provider) {
            return {
                success: false,
                error: `Provider '${providerId}' not found`
            };
        }
        if (!this.isProviderConfigured(providerId)) {
            return {
                success: false,
                error: `Provider '${providerId}' is not properly configured. Please provide API key or endpoint.`
            };
        }
        try {
            switch (providerId) {
                case 'openai':
                    return await this.processWithOpenAI(provider, text, files, options);
                case 'anthropic':
                    return await this.processWithAnthropic(provider, text, files, options);
                case 'mistral':
                    return await this.processWithMistral(provider, text, files, options);
                case 'lmstudio':
                    return await this.processWithLMStudio(provider, text, files, options);
                case 'ollama':
                    return await this.processWithOllama(provider, text, files, options);
                case 'gemini':
                    return await this.processWithGemini(provider, text, files, options);
                default:
                    return {
                        success: false,
                        error: `Provider '${providerId}' is not supported`
                    };
            }
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            };
        }
    }
    async processWithOpenAI(provider, text, files, options = {}) {
        const prompt = this.buildPrompt(text, files, options);
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${provider.apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: provider.model || 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: this.getSystemPrompt(options)
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: provider.maxTokens || 1000,
                temperature: provider.temperature || 0.1,
                response_format: options.extractStructuredData ? { type: 'json_object' } : undefined
            })
        });
        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return {
            success: true,
            data: this.parseAIResponse(data, options),
            usage: {
                promptTokens: data.usage?.prompt_tokens || 0,
                completionTokens: data.usage?.completion_tokens || 0,
                totalTokens: data.usage?.total_tokens || 0
            }
        };
    }
    async processWithAnthropic(provider, text, files, options = {}) {
        const prompt = this.buildPrompt(text, files, options);
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'x-api-key': provider.apiKey,
                'Content-Type': 'application/json',
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: provider.model || 'claude-3-5-sonnet-20241022',
                max_tokens: provider.maxTokens || 1000,
                temperature: provider.temperature || 0.1,
                system: this.getSystemPrompt(options),
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            })
        });
        if (!response.ok) {
            throw new Error(`Anthropic API error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return {
            success: true,
            data: this.parseAIResponse(data, options),
            usage: {
                promptTokens: data.usage?.input_tokens || 0,
                completionTokens: data.usage?.output_tokens || 0,
                totalTokens: (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0)
            }
        };
    }
    async processWithMistral(provider, text, files, options = {}) {
        const prompt = this.buildPrompt(text, files, options);
        const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${provider.apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: provider.model || 'mistral-small-latest',
                messages: [
                    {
                        role: 'system',
                        content: this.getSystemPrompt(options)
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: provider.maxTokens || 1000,
                temperature: provider.temperature || 0.1,
                stream: false
            })
        });
        if (!response.ok) {
            throw new Error(`Mistral API error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return {
            success: true,
            data: this.parseAIResponse(data, options),
            usage: {
                promptTokens: data.usage?.prompt_tokens || 0,
                completionTokens: data.usage?.completion_tokens || 0,
                totalTokens: data.usage?.total_tokens || 0
            }
        };
    }
    async processWithLMStudio(provider, text, files, options = {}) {
        const prompt = this.buildPrompt(text, files, options);
        // Try to avoid CORS preflight by using a simpler request
        const requestBody = JSON.stringify({
            model: provider.model || 'openai/gpt-oss-20b',
            messages: [
                {
                    role: 'system',
                    content: this.getSystemPrompt(options)
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            max_tokens: provider.maxTokens || 1000,
            temperature: provider.temperature || 0.1,
            stream: false
            // Note: Local models don't support response_format, so we omit it
        });
        // Use Next.js API route as proxy to avoid CORS issues
        const proxyEndpoint = '/api/lmstudio';
        const response = await fetch(proxyEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: requestBody
        });
        if (!response.ok) {
            throw new Error(`LM Studio API error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return {
            success: true,
            data: this.parseAIResponse(data, options),
            usage: {
                promptTokens: 0, // LM Studio doesn't provide usage stats
                completionTokens: 0,
                totalTokens: 0
            }
        };
    }
    async processWithOllama(provider, text, files, options = {}) {
        const prompt = this.buildPrompt(text, files, options);
        const response = await fetch(provider.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: provider.model || 'mixtral',
                prompt: `${this.getSystemPrompt(options)}\n\nUser: ${prompt}`,
                stream: false,
                options: {
                    temperature: provider.temperature || 0.1,
                    num_predict: provider.maxTokens || 1000
                }
            })
        });
        if (!response.ok) {
            throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return {
            success: true,
            data: this.parseAIResponse(data, options),
            usage: {
                promptTokens: 0, // Ollama doesn't provide usage stats
                completionTokens: 0,
                totalTokens: 0
            }
        };
    }
    async processWithGemini(provider, text, files, options = {}) {
        const prompt = this.buildPrompt(text, files, options);
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${provider.model || 'gemini-1.5-flash'}:generateContent?key=${provider.apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: `${this.getSystemPrompt(options)}\n\nUser: ${prompt}`
                            }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: provider.temperature || 0.1,
                    maxOutputTokens: provider.maxTokens || 1000
                }
            })
        });
        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return {
            success: true,
            data: this.parseAIResponse(data, options),
            usage: {
                promptTokens: 0, // Gemini doesn't provide detailed usage stats
                completionTokens: 0,
                totalTokens: 0
            }
        };
    }
    buildPrompt(text, files, options = {}) {
        // Use custom prompt builder if provided
        if (options.customPromptBuilder) {
            const customPrompts = options.customPromptBuilder(text, files, options);
            return customPrompts.userPrompt;
        }
        // Use custom user prompt template if provided
        if (options.userPromptTemplate) {
            let prompt = options.userPromptTemplate;
            // Replace placeholders
            prompt = prompt.replace(/{text}/g, text);
            prompt = prompt.replace(/{files}/g, files && files.length > 0
                ? files.map(f => f.name).join(', ')
                : 'No files attached');
            return prompt;
        }
        // Default prompt building
        let prompt = `User Input: ${text}`;
        if (files && files.length > 0) {
            prompt += `\n\nAttached Files: ${files.map(f => f.name).join(', ')}`;
            // Note: In a real implementation, you'd process the file contents here
        }
        if (options.extractStructuredData && options.schema) {
            prompt += `\n\nPlease extract the following information and return it as JSON:`;
            Object.entries(options.schema).forEach(([key, value]) => {
                prompt += `\n- ${key}: ${value}`;
            });
        }
        return prompt;
    }
    getSystemPrompt(options = {}) {
        // Use custom prompt builder if provided
        if (options.customPromptBuilder) {
            const customPrompts = options.customPromptBuilder('', [], options);
            return customPrompts.systemPrompt;
        }
        // Use custom system prompt if provided
        if (options.systemPrompt) {
            return options.systemPrompt;
        }
        // Default system prompt building
        let systemPrompt = "You are a helpful AI assistant that processes user input and extracts relevant information.";
        if (options.extractStructuredData) {
            systemPrompt += " Extract the requested information and return it as structured JSON data.";
        }
        if (options.clarificationMode) {
            systemPrompt += " If information is missing or unclear, ask clarifying questions to help the user provide better input.";
        }
        if (options.language) {
            systemPrompt += ` Respond in ${options.language}.`;
        }
        return systemPrompt;
    }
    parseAIResponse(data, options = {}) {
        if (options.extractStructuredData) {
            try {
                // Try to parse JSON response
                const content = data.choices?.[0]?.message?.content ||
                    data.content?.[0]?.parts?.[0]?.text ||
                    data.response;
                if (content) {
                    return JSON.parse(content);
                }
            }
            catch (error) {
                // If JSON parsing fails, return the raw content
                return data.choices?.[0]?.message?.content ||
                    data.content?.[0]?.parts?.[0]?.text ||
                    data.response ||
                    data;
            }
        }
        return data.choices?.[0]?.message?.content ||
            data.content?.[0]?.parts?.[0]?.text ||
            data.response ||
            data;
    }
}
// Export a singleton instance
const aiServiceManager = new AIServiceManager();

function useAIProcessing(options) {
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [lastResponse, setLastResponse] = React.useState(null);
    const [error, setError] = React.useState(null);
    // Configure the provider when options change
    const configureProvider = React.useCallback((config) => {
        aiServiceManager.configureProvider(options.provider, {
            ...config,
            apiKey: options.apiKey,
            endpoint: options.endpoint,
            model: options.model,
            maxTokens: options.maxTokens,
            temperature: options.temperature
        });
    }, [options.provider, options.apiKey, options.endpoint, options.model, options.maxTokens, options.temperature]);
    // Auto-configure provider when options change
    React.useEffect(() => {
        if (options.provider && (options.apiKey || options.endpoint)) {
            configureProvider({});
        }
    }, [options.provider, options.apiKey, options.endpoint, options.model, configureProvider]);
    // Check if provider is configured
    const isConfigured = aiServiceManager.isProviderConfigured(options.provider);
    // Get available providers
    const availableProviders = aiServiceManager.getAvailableProviders();
    // Process text with AI
    const processText = React.useCallback(async (text, files) => {
        setIsProcessing(true);
        setError(null);
        try {
            // Configure provider if not already configured
            if (!isConfigured) {
                configureProvider({});
            }
            // Call onAIStart callback if provided
            if (options.onAIStart) {
                options.onAIStart();
            }
            const processingOptions = {
                extractStructuredData: options.extractStructuredData,
                schema: options.schema,
                clarificationMode: options.clarificationMode,
                language: options.language,
                systemPrompt: options.systemPrompt,
                userPromptTemplate: options.userPromptTemplate,
                customPromptBuilder: options.customPromptBuilder
            };
            const response = await aiServiceManager.processText(options.provider, text, files, processingOptions);
            setLastResponse(response);
            return response;
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
            setError(errorMessage);
            const errorResponse = {
                success: false,
                error: errorMessage
            };
            setLastResponse(errorResponse);
            return errorResponse;
        }
        finally {
            setIsProcessing(false);
        }
    }, [options, isConfigured, configureProvider]);
    return {
        processText,
        isProcessing,
        lastResponse,
        error,
        configureProvider,
        isConfigured,
        availableProviders
    };
}

const ConversationalInput = ({ onSubmit, aiProcessing, placeholder = "Start typing or speaking naturally...", requireFiles = false, acceptedFileTypes = ['.pdf', '.doc', '.docx', '.txt'], maxFileSize = 10 * 1024 * 1024, // 10MB
className = "", showClearButton = true, labels = {}, enableVoice = true, enableFileUpload = true, showSubmitButton = true, validateInput, isSubmitting = false, disabled = false, initialValue = "", value: controlledValue, onTextChange, onFilesChange, autoSubmitOnEnter = false, submitTrigger = 'both', clearAfterSubmit = true, classNames = {}, render, }) => {
    const [text, setText] = React.useState(initialValue);
    const [error, setError] = React.useState(null);
    const textareaRef = React.useRef(null);
    // AI Processing hook
    const aiProcessingHook = useAIProcessing({
        provider: aiProcessing?.provider || 'openai',
        apiKey: aiProcessing?.apiKey,
        endpoint: aiProcessing?.endpoint,
        model: aiProcessing?.model,
        maxTokens: aiProcessing?.maxTokens,
        temperature: aiProcessing?.temperature,
        extractStructuredData: aiProcessing?.extractStructuredData,
        schema: aiProcessing?.schema,
        clarificationMode: aiProcessing?.clarificationMode,
        language: aiProcessing?.language,
        systemPrompt: aiProcessing?.systemPrompt,
        userPromptTemplate: aiProcessing?.userPromptTemplate,
        customPromptBuilder: aiProcessing?.customPromptBuilder,
        onAIStart: aiProcessing?.onAIStart,
        onAIResponse: aiProcessing?.onAIResponse,
        onAIError: aiProcessing?.onAIError
    });
    // Use controlled value if provided
    const displayText = controlledValue !== undefined ? controlledValue : text;
    const { isListening, isSupported: voiceSupported, startListening, stopListening, transcript, resetTranscript, } = useVoiceRecognition();
    const { files, addFiles, removeFile: removeFileFromHook, clearFiles, validateFile, } = useFileUpload(acceptedFileTypes, maxFileSize);
    // Merge voice transcript with typed text
    const fullText = displayText + (isListening ? transcript : '');
    // Handle text changes
    const handleTextChange = React.useCallback((newText) => {
        if (controlledValue === undefined) {
            setText(newText);
        }
        onTextChange?.(newText);
    }, [controlledValue, onTextChange]);
    // Handle file changes
    const handleFilesChange = React.useCallback((newFiles) => {
        onFilesChange?.(newFiles);
    }, [onFilesChange]);
    // Update files when they change
    React.useEffect(() => {
        handleFilesChange(files);
    }, [files, handleFilesChange]);
    const toggleMic = React.useCallback(() => {
        if (!voiceSupported) {
            setError('Voice input is not supported in this browser');
            return;
        }
        if (isListening) {
            stopListening();
            // Add the transcript to the main text
            const newText = displayText + transcript;
            handleTextChange(newText);
            resetTranscript();
        }
        else {
            startListening();
        }
    }, [isListening, voiceSupported, startListening, stopListening, transcript, resetTranscript, displayText, handleTextChange]);
    const handleFileUpload = React.useCallback((event) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            addFiles(selectedFiles);
        }
        // Reset the input value to allow selecting the same file again
        event.target.value = '';
    }, [addFiles]);
    const handleSubmit = React.useCallback(async () => {
        if (!fullText.trim()) {
            setError('Please enter some text before submitting');
            return;
        }
        if (requireFiles && files.length === 0) {
            setError('Please upload at least one file before submitting');
            return;
        }
        if (validateInput) {
            const validationError = validateInput(fullText);
            if (validationError) {
                setError(validationError);
                return;
            }
        }
        setError(null);
        try {
            // If AI processing is configured, process the text first
            if (aiProcessing && aiProcessingHook.isConfigured) {
                const aiResponse = await aiProcessingHook.processText(fullText, files);
                if (aiResponse.success) {
                    // Call the AI response callback if provided
                    if (aiProcessing.onAIResponse) {
                        aiProcessing.onAIResponse(aiResponse.data);
                    }
                }
                else {
                    // Call the AI error callback if provided
                    if (aiProcessing.onAIError) {
                        aiProcessing.onAIError(aiResponse.error || 'AI processing failed');
                    }
                    setError(aiResponse.error || 'AI processing failed');
                    return;
                }
            }
            await onSubmit(fullText, files);
            // Clear form after successful submission if enabled
            if (clearAfterSubmit) {
                if (controlledValue === undefined) {
                    setText('');
                }
                clearFiles();
                resetTranscript();
            }
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Submission failed');
        }
    }, [fullText, files, requireFiles, validateInput, onSubmit, clearAfterSubmit, controlledValue, clearFiles, resetTranscript, aiProcessing, aiProcessingHook]);
    const clearText = React.useCallback(() => {
        if (controlledValue === undefined) {
            setText('');
        }
        resetTranscript();
        setError(null);
    }, [controlledValue, resetTranscript]);
    const handleRemoveFile = React.useCallback((index) => {
        removeFileFromHook(index);
    }, [removeFileFromHook]);
    // Handle Enter key for auto-submit
    const handleKeyDown = React.useCallback((event) => {
        if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            if (submitTrigger === 'enter' || submitTrigger === 'both') {
                handleSubmit();
            }
        }
    }, [handleSubmit, submitTrigger]);
    const defaultLabels = {
        submit: 'Submit',
        clear: 'Clear text',
        addAttachments: 'add attachments',
        useVoice: 'use voice',
        listening: 'Listening...',
        cvReady: 'File Ready ✓',
    };
    const finalLabels = { ...defaultLabels, ...labels };
    // Determine if submit should be disabled
    const isSubmitDisabled = Boolean(!fullText.trim() ||
        (requireFiles && files.length === 0) ||
        isSubmitting ||
        disabled ||
        submitTrigger === 'none' ||
        (aiProcessing && !aiProcessingHook.isConfigured) // Disable if AI processing is expected but not configured
    );
    // Render custom components if provided
    const renderVoiceButton = () => {
        if (!enableVoice || !voiceSupported)
            return null;
        if (render?.voiceButton) {
            return render.voiceButton({
                isListening,
                isSupported: voiceSupported,
                onClick: toggleMic,
                disabled: disabled || isSubmitting,
                className: classNames.voiceButton || "flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
            });
        }
        return (jsxRuntimeExports.jsxs("button", { onClick: toggleMic, disabled: disabled || isSubmitting, className: `flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium ${isListening ? 'border-green-300 bg-green-50 text-green-700' : ''} ${disabled || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`, "aria-pressed": isListening, children: [jsxRuntimeExports.jsx(lucideReact.Mic, { className: "w-4 h-4" }), finalLabels.useVoice] }));
    };
    const renderFileButton = () => {
        if (!enableFileUpload)
            return null;
        if (render?.fileButton) {
            return render.fileButton({
                onClick: () => textareaRef.current?.querySelector('input[type="file"]')?.click(),
                disabled: disabled || isSubmitting,
                className: classNames.fileButton || "cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium",
                acceptedTypes: acceptedFileTypes
            });
        }
        return (jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsx("input", { type: "file", id: "file-upload", accept: acceptedFileTypes.join(','), onChange: handleFileUpload, className: "hidden", multiple: true, disabled: disabled || isSubmitting }), jsxRuntimeExports.jsxs("label", { htmlFor: "file-upload", className: `cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium ${disabled || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`, children: [jsxRuntimeExports.jsx(lucideReact.Upload, { className: "w-4 h-4" }), finalLabels.addAttachments] })] }));
    };
    const renderSubmitButton = () => {
        if (!showSubmitButton)
            return null;
        if (render?.submitButton) {
            return render.submitButton({
                onClick: handleSubmit,
                disabled: isSubmitDisabled,
                className: classNames.submitButton || "px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed",
                style: !classNames.submitButton ? {
                    backgroundColor: isSubmitDisabled ? '#6b7280' : '#000000',
                    color: '#ffffff',
                    border: 'none',
                    opacity: isSubmitDisabled ? 0.5 : 1,
                    cursor: isSubmitDisabled ? 'not-allowed' : 'pointer',
                    padding: '8px 24px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.2s'
                } : undefined,
                isSubmitting,
                text: finalLabels.submit
            });
        }
        return (jsxRuntimeExports.jsx("button", { onClick: handleSubmit, disabled: isSubmitDisabled, className: "px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed", style: {
                backgroundColor: isSubmitDisabled ? '#6b7280' : '#000000',
                color: '#ffffff',
                border: 'none',
                opacity: isSubmitDisabled ? 0.5 : 1,
                cursor: isSubmitDisabled ? 'not-allowed' : 'pointer',
                ...(!classNames.submitButton && {
                    padding: '8px 24px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.2s'
                })
            }, onMouseEnter: (e) => {
                if (!isSubmitDisabled && !classNames.submitButton) {
                    e.currentTarget.style.backgroundColor = '#374151';
                }
            }, onMouseLeave: (e) => {
                if (!isSubmitDisabled && !classNames.submitButton) {
                    e.currentTarget.style.backgroundColor = '#000000';
                }
            }, children: isSubmitting ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(lucideReact.Loader2, { className: "w-4 h-4 animate-spin inline mr-2" }), "Processing..."] })) : (finalLabels.submit) }));
    };
    const renderClearButton = () => {
        if (!showClearButton || !fullText)
            return null;
        if (render?.clearButton) {
            return render.clearButton({
                onClick: clearText,
                disabled: disabled || isSubmitting,
                className: classNames.clearButton || "px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50"
            });
        }
        return (jsxRuntimeExports.jsx("button", { onClick: clearText, disabled: disabled || isSubmitting, className: "px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50", children: finalLabels.clear }));
    };
    const renderFileDisplay = () => {
        if (files.length === 0)
            return null;
        if (render?.fileDisplay) {
            return render.fileDisplay({
                files,
                onRemove: handleRemoveFile,
                disabled: disabled || isSubmitting,
                className: classNames.fileDisplay || "mt-4 space-y-2"
            });
        }
        return (jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-2", children: files.map((file, index) => (jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-green-300 bg-green-50 text-green-700", children: [jsxRuntimeExports.jsx(lucideReact.FileText, { className: "w-4 h-4" }), jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: file.name }), jsxRuntimeExports.jsx("button", { onClick: () => handleRemoveFile(index), className: "ml-2 p-1 text-green-600 hover:text-green-800 transition-colors", disabled: disabled || isSubmitting, children: jsxRuntimeExports.jsx(lucideReact.XCircle, { className: "w-3 h-3" }) })] }, index))) }));
    };
    const renderErrorDisplay = () => {
        if (!error)
            return null;
        if (render?.errorDisplay) {
            return render.errorDisplay({
                error,
                className: classNames.errorDisplay || "mt-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm"
            });
        }
        return (jsxRuntimeExports.jsx("div", { className: "mt-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm", children: error }));
    };
    return (jsxRuntimeExports.jsxs("div", { className: `w-full max-w-3xl mx-auto ${className || ''} ${classNames.container || ''}`, children: [jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden", children: [jsxRuntimeExports.jsxs("div", { className: "relative", children: [jsxRuntimeExports.jsx("textarea", { ref: textareaRef, className: `w-full h-[40vh] p-6 text-xl resize-none text-gray-900 placeholder-gray-500 border-none focus:outline-none ${isListening ? 'bg-green-50' : 'bg-white'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${classNames.textarea || ''}`, placeholder: placeholder, value: fullText, onChange: e => handleTextChange(e.target.value), onKeyDown: handleKeyDown, disabled: disabled || isSubmitting }), isListening && (jsxRuntimeExports.jsxs("div", { className: "absolute top-4 right-4 flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium", children: [jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full animate-pulse" }), finalLabels.listening] }))] }), (enableVoice || enableFileUpload || showSubmitButton || (showClearButton && fullText)) && (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("div", { className: "border-t border-gray-200" }), jsxRuntimeExports.jsxs("div", { className: `p-4 flex items-center justify-between ${classNames.actionBar || ''}`, children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [renderFileButton(), renderVoiceButton()] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [renderClearButton(), renderSubmitButton()] })] })] }))] }), renderErrorDisplay(), renderFileDisplay(), enableVoice && !voiceSupported && (jsxRuntimeExports.jsx("div", { className: "mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg text-yellow-700 text-sm", children: "Voice input is not supported in this browser. Please use text input instead." }))] }));
};

const Clarifier = ({ question, type = 'info', show = true, onClarify, suggestions = [], showInput = true, inputPlaceholder = "Please provide more details...", className = "", dismissible = false, onDismiss, }) => {
    const [response, setResponse] = React.useState('');
    const [isExpanded, setIsExpanded] = React.useState(false);
    if (!show)
        return null;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (response.trim() && onClarify) {
            onClarify(response.trim());
            setResponse('');
        }
    };
    const handleSuggestionClick = (suggestion) => {
        if (onClarify) {
            onClarify(suggestion);
        }
    };
    const getTypeStyles = () => {
        switch (type) {
            case 'warning':
                return 'bg-yellow-50 border-yellow-200 text-yellow-800';
            case 'error':
                return 'bg-red-50 border-red-200 text-red-800';
            case 'success':
                return 'bg-green-50 border-green-200 text-green-800';
            default:
                return 'bg-blue-50 border-blue-200 text-blue-800';
        }
    };
    const getIcon = () => {
        switch (type) {
            case 'warning':
                return jsxRuntimeExports.jsx(lucideReact.AlertCircle, { className: "w-5 h-5 text-yellow-600" });
            case 'error':
                return jsxRuntimeExports.jsx(lucideReact.AlertCircle, { className: "w-5 h-5 text-red-600" });
            case 'success':
                return jsxRuntimeExports.jsx(lucideReact.CheckCircle, { className: "w-5 h-5 text-green-600" });
            default:
                return jsxRuntimeExports.jsx(lucideReact.HelpCircle, { className: "w-5 h-5 text-blue-600" });
        }
    };
    return (jsxRuntimeExports.jsx("div", { className: `rounded-lg border p-4 ${getTypeStyles()} ${className}`, children: jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [getIcon(), jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [jsxRuntimeExports.jsx("p", { className: "text-sm font-medium leading-relaxed", children: question }), dismissible && onDismiss && (jsxRuntimeExports.jsx("button", { onClick: onDismiss, className: "flex-shrink-0 p-1 hover:bg-white/20 rounded transition-colors", "aria-label": "Dismiss", children: jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) }))] }), suggestions.length > 0 && (jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [jsxRuntimeExports.jsx("p", { className: "text-xs font-medium mb-2 opacity-75", children: "Suggested responses:" }), jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: suggestions.map((suggestion, index) => (jsxRuntimeExports.jsx("button", { onClick: () => handleSuggestionClick(suggestion), className: "px-3 py-1 text-xs bg-white/50 hover:bg-white/70 rounded-full border border-current/20 transition-colors", children: suggestion }, index))) })] })), showInput && (jsxRuntimeExports.jsx("form", { onSubmit: handleSubmit, className: "mt-3", children: jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [jsxRuntimeExports.jsx("input", { type: "text", value: response, onChange: (e) => setResponse(e.target.value), placeholder: inputPlaceholder, className: "flex-1 px-3 py-2 text-sm bg-white/70 border border-current/20 rounded-md focus:outline-none focus:ring-2 focus:ring-current/40 focus:border-transparent" }), jsxRuntimeExports.jsx("button", { type: "submit", disabled: !response.trim(), className: "px-4 py-2 text-sm bg-current text-white rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity", children: "Submit" })] }) })), isExpanded && (jsxRuntimeExports.jsx("div", { className: "mt-3 pt-3 border-t border-current/20", children: jsxRuntimeExports.jsx("p", { className: "text-xs opacity-75", children: "This clarification helps us better understand your needs and provide more accurate assistance." }) }))] })] }) }));
};

const AIProviderConfig = ({ onConfigure, currentConfig }) => {
    const [provider, setProvider] = React.useState(currentConfig?.provider || 'openai');
    const [apiKey, setApiKey] = React.useState(currentConfig?.apiKey || '');
    const [endpoint, setEndpoint] = React.useState(currentConfig?.endpoint || '');
    const [model, setModel] = React.useState(currentConfig?.model || '');
    const [isConfigured, setIsConfigured] = React.useState(false);
    // Initialize model with default value for the selected provider
    React.useEffect(() => {
        if (!currentConfig?.model) {
            const providerInfo = getProviderInfo(provider);
            setModel(providerInfo.defaultModel);
            setEndpoint(providerInfo.defaultEndpoint);
        }
    }, [provider, currentConfig?.model]);
    const handleSave = () => {
        const config = {
            provider,
            apiKey: provider === 'openai' || provider === 'anthropic' || provider === 'gemini' || provider === 'mistral' ? apiKey : undefined,
            endpoint: provider === 'lmstudio' || provider === 'ollama' ? endpoint : undefined,
            model: model || undefined
        };
        onConfigure(config);
        setIsConfigured(true);
        // Reset after 2 seconds
        setTimeout(() => setIsConfigured(false), 2000);
    };
    const getProviderInfo = (providerId) => {
        switch (providerId) {
            case 'openai':
                return {
                    name: 'OpenAI',
                    description: 'GPT models for general purpose AI',
                    icon: '🤖',
                    needsApiKey: true,
                    defaultModel: 'gpt-4o-mini',
                    defaultEndpoint: ''
                };
            case 'anthropic':
                return {
                    name: 'Anthropic Claude',
                    description: 'Claude models for advanced reasoning',
                    icon: '🧠',
                    needsApiKey: true,
                    defaultModel: 'claude-3-5-sonnet-20241022',
                    defaultEndpoint: ''
                };
            case 'lmstudio':
                return {
                    name: 'LM Studio',
                    description: 'Local AI models for privacy',
                    icon: '🏠',
                    needsApiKey: false,
                    defaultModel: 'openai/gpt-oss-20b',
                    defaultEndpoint: 'http://localhost:1234/v1/chat/completions'
                };
            case 'ollama':
                return {
                    name: 'Ollama',
                    description: 'Local AI models with easy setup',
                    icon: '🦙',
                    needsApiKey: false,
                    defaultModel: 'mixtral',
                    defaultEndpoint: 'http://localhost:11434/api/generate'
                };
            case 'gemini':
                return {
                    name: 'Google Gemini',
                    description: 'Google\'s advanced AI models',
                    icon: '💎',
                    needsApiKey: true,
                    defaultModel: 'gemini-1.5-flash',
                    defaultEndpoint: ''
                };
            case 'mistral':
                return {
                    name: 'Mistral Cloud',
                    description: 'Mistral\'s powerful AI models',
                    icon: '🌪️',
                    needsApiKey: true,
                    defaultModel: 'mistral-small-latest',
                    defaultEndpoint: ''
                };
            default:
                return {
                    name: 'Unknown',
                    description: 'Unknown provider',
                    icon: '❓',
                    needsApiKey: false,
                    defaultModel: '',
                    defaultEndpoint: ''
                };
        }
    };
    const providerInfo = getProviderInfo(provider);
    return (jsxRuntimeExports.jsxs("div", { className: "bg-white", children: [jsxRuntimeExports.jsx("div", { className: "mb-6", children: jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-3", children: ['openai', 'anthropic', 'lmstudio', 'ollama', 'gemini', 'mistral'].map((providerId) => {
                        const info = getProviderInfo(providerId);
                        return (jsxRuntimeExports.jsxs("button", { onClick: () => {
                                setProvider(providerId);
                                setModel(info.defaultModel);
                                setEndpoint(info.defaultEndpoint);
                            }, className: `p-3 rounded-lg border-2 transition-all ${provider === providerId
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'}`, children: [jsxRuntimeExports.jsx("div", { className: "text-2xl mb-1", children: info.icon }), jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-gray-900", children: info.name }), jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500", children: info.description })] }, providerId));
                    }) }) }), jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [providerInfo.needsApiKey && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: [jsxRuntimeExports.jsx(lucideReact.Key, { className: "w-4 h-4 inline mr-1" }), "API Key"] }), jsxRuntimeExports.jsx("input", { type: "password", value: apiKey, onChange: (e) => setApiKey(e.target.value), placeholder: `Enter your ${providerInfo.name} API key`, className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900" }), jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Your API key is stored locally and never sent to our servers" })] })), !providerInfo.needsApiKey && (jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: [jsxRuntimeExports.jsx(lucideReact.Server, { className: "w-4 h-4 inline mr-1" }), "Endpoint URL"] }), jsxRuntimeExports.jsx("input", { type: "url", value: endpoint, onChange: (e) => setEndpoint(e.target.value), placeholder: providerInfo.defaultEndpoint, className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900" }), jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Make sure your local AI service is running" })] })), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Model Name" }), jsxRuntimeExports.jsx("input", { type: "text", value: model, onChange: (e) => setModel(e.target.value), placeholder: providerInfo.defaultModel, className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" })] })] }), jsxRuntimeExports.jsx("div", { className: "mt-6", children: jsxRuntimeExports.jsx("button", { onClick: handleSave, disabled: !apiKey && !endpoint, className: "w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2", children: isConfigured ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(lucideReact.CheckCircle, { className: "w-5 h-5" }), jsxRuntimeExports.jsx("span", { children: "Configured!" })] })) : (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(lucideReact.Settings, { className: "w-5 h-5" }), jsxRuntimeExports.jsx("span", { children: "Save Configuration" })] })) }) }), isConfigured && (jsxRuntimeExports.jsxs("div", { className: "mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2", children: [jsxRuntimeExports.jsx(lucideReact.CheckCircle, { className: "w-5 h-5 text-green-600" }), jsxRuntimeExports.jsx("span", { className: "text-green-800 text-sm", children: "AI provider configured successfully! You can now use AI processing." })] })), jsxRuntimeExports.jsx("div", { className: "mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg", children: jsxRuntimeExports.jsxs("div", { className: "flex items-start space-x-2", children: [jsxRuntimeExports.jsx(lucideReact.AlertCircle, { className: "w-5 h-5 text-blue-600 mt-0.5" }), jsxRuntimeExports.jsxs("div", { className: "text-blue-800 text-sm", children: [jsxRuntimeExports.jsx("p", { className: "font-medium mb-1", children: "Need help getting started?" }), jsxRuntimeExports.jsxs("ul", { className: "text-xs space-y-1", children: [jsxRuntimeExports.jsxs("li", { children: ["\u2022 ", jsxRuntimeExports.jsx("strong", { children: "OpenAI:" }), " Get your API key from platform.openai.com"] }), jsxRuntimeExports.jsxs("li", { children: ["\u2022 ", jsxRuntimeExports.jsx("strong", { children: "Anthropic:" }), " Get your API key from console.anthropic.com"] }), jsxRuntimeExports.jsxs("li", { children: ["\u2022 ", jsxRuntimeExports.jsx("strong", { children: "LM Studio:" }), " Download and run LM Studio locally"] }), jsxRuntimeExports.jsxs("li", { children: ["\u2022 ", jsxRuntimeExports.jsx("strong", { children: "Ollama:" }), " Install Ollama and run: ollama run mixtral"] }), jsxRuntimeExports.jsxs("li", { children: ["\u2022 ", jsxRuntimeExports.jsx("strong", { children: "Gemini:" }), " Get your API key from makersuite.google.com"] })] })] })] }) })] }));
};

/**
 * Basic Usage Example
 *
 * This example shows the simplest way to use ConversationalInput
 * with default settings and basic functionality.
 */
const BasicUsage = () => {
    const handleSubmit = async (text, files) => {
        console.log('Basic submission:', { text, files });
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert(`Received: "${text}" and ${files?.length || 0} files`);
    };
    return (jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto p-6", children: [jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-4", children: "Basic Usage" }), jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-6", children: "Simple conversational input with voice, file upload, and submit functionality." }), jsxRuntimeExports.jsx(ConversationalInput, { onSubmit: handleSubmit, placeholder: "Tell me about your experience..." }), jsxRuntimeExports.jsxs("div", { className: "mt-4 text-sm text-gray-500", children: [jsxRuntimeExports.jsx("p", { children: "\u2705 Voice input enabled" }), jsxRuntimeExports.jsx("p", { children: "\u2705 File upload enabled" }), jsxRuntimeExports.jsx("p", { children: "\u2705 Submit button enabled" }), jsxRuntimeExports.jsx("p", { children: "\u2705 Clear text button enabled" })] })] }));
};

/**
 * Form Integration Example
 *
 * This example shows how to integrate ConversationalInput
 * into a larger form without using its submit functionality.
 */
const FormIntegration = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        description: '',
        files: []
    });
    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert(`Form submitted with: ${formData.description} and ${formData.files.length} files`);
    };
    const handleTextChange = (text) => {
        setFormData(prev => ({ ...prev, description: text }));
    };
    const handleFilesChange = (files) => {
        setFormData(prev => ({ ...prev, files }));
    };
    return (jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto p-6", children: [jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-4", children: "Form Integration" }), jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-6", children: "ConversationalInput embedded in a larger form, letting the form handle submission." }), jsxRuntimeExports.jsxs("form", { onSubmit: handleFormSubmit, className: "space-y-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Name" }), jsxRuntimeExports.jsx("input", { type: "text", value: formData.name, onChange: (e) => setFormData(prev => ({ ...prev, name: e.target.value })), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", required: true })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Email" }), jsxRuntimeExports.jsx("input", { type: "email", value: formData.email, onChange: (e) => setFormData(prev => ({ ...prev, email: e.target.value })), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", required: true })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Description (Conversational Input)" }), jsxRuntimeExports.jsx(ConversationalInput, { onSubmit: () => { }, showSubmitButton: false, submitTrigger: "none" // Disable auto-submit
                                , onTextChange: handleTextChange, onFilesChange: handleFilesChange, placeholder: "Describe your needs naturally...", className: "border border-gray-300 rounded-md" })] }), jsxRuntimeExports.jsx("button", { type: "submit", className: "w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors", children: "Submit Form" })] }), jsxRuntimeExports.jsxs("div", { className: "mt-4 text-sm text-gray-500", children: [jsxRuntimeExports.jsx("p", { children: "\u2705 Embedded in larger form" }), jsxRuntimeExports.jsx("p", { children: "\u2705 No submit button (form handles submission)" }), jsxRuntimeExports.jsx("p", { children: "\u2705 Controlled text and files" }), jsxRuntimeExports.jsx("p", { children: "\u2705 Form validation works" })] })] }));
};

/**
 * Custom Styling Example
 *
 * This example shows how to customize the appearance
 * using the classNames prop and custom CSS.
 */
const CustomStyling = () => {
    const handleSubmit = async (text, files) => {
        console.log('Custom styled submission:', { text, files });
        alert(`Received: "${text}" and ${files?.length || 0} files`);
    };
    return (jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto p-6", children: [jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-4", children: "Custom Styling" }), jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-6", children: "Customize the appearance using classNames and custom CSS classes." }), jsxRuntimeExports.jsx(ConversationalInput, { onSubmit: handleSubmit, placeholder: "Try our custom styled input...", classNames: {
                    container: "max-w-full",
                    textarea: "h-32 text-lg font-serif bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 focus:border-purple-500 focus:ring-purple-200",
                    actionBar: "bg-gradient-to-r from-purple-100 to-blue-100 p-3 rounded-b-lg",
                    voiceButton: "bg-purple-600 text-white border-0 hover:bg-purple-700 px-6 py-2 rounded-full",
                    fileButton: "bg-blue-600 text-white border-0 hover:bg-blue-700 px-6 py-2 rounded-full",
                    submitButton: "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 hover:from-green-600 hover:to-emerald-700 px-8 py-2 rounded-full font-semibold",
                    clearButton: "bg-red-500 text-white border-0 hover:bg-red-600 px-4 py-2 rounded-full",
                    fileDisplay: "bg-white/80 backdrop-blur-sm border border-purple-200 rounded-lg p-2",
                    errorDisplay: "bg-red-100 border border-red-300 text-red-800 rounded-lg p-3"
                } }), jsxRuntimeExports.jsxs("div", { className: "mt-4 text-sm text-gray-500", children: [jsxRuntimeExports.jsx("p", { children: "\u2705 Custom container styling" }), jsxRuntimeExports.jsx("p", { children: "\u2705 Gradient backgrounds" }), jsxRuntimeExports.jsx("p", { children: "\u2705 Custom button colors" }), jsxRuntimeExports.jsx("p", { children: "\u2705 Enhanced textarea appearance" }), jsxRuntimeExports.jsx("p", { children: "\u2705 Custom file display styling" })] })] }));
};

/**
 * Render Props Example
 *
 * This example shows how to use render props for complete
 * customization of button appearance and behavior.
 */
const RenderProps = () => {
    const handleSubmit = async (text, files) => {
        console.log('Render props submission:', { text, files });
        alert(`Received: "${text}" and ${files?.length || 0} files`);
    };
    return (jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto p-6", children: [jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-4", children: "Render Props" }), jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-6", children: "Complete customization using render props for maximum flexibility." }), jsxRuntimeExports.jsx(ConversationalInput, { onSubmit: handleSubmit, placeholder: "Try our completely custom rendered interface...", render: {
                    voiceButton: ({ isListening, onClick, disabled, className }) => (jsxRuntimeExports.jsx("button", { onClick: onClick, disabled: disabled, className: `${className} ${isListening ? 'animate-pulse bg-red-500' : 'bg-blue-500'} text-white px-6 py-2 rounded-full font-bold transition-all duration-300`, children: isListening ? '🔴 Recording...' : '🎤 Start Voice' })),
                    fileButton: ({ onClick, disabled, className, acceptedTypes }) => (jsxRuntimeExports.jsxs("button", { onClick: onClick, disabled: disabled, className: `${className} bg-green-500 text-white px-6 py-2 rounded-full font-bold hover:bg-green-600 transition-colors`, children: ["\uD83D\uDCCE Add Files (", acceptedTypes.join(', '), ")"] })),
                    submitButton: ({ onClick, disabled, isSubmitting, text, className }) => (jsxRuntimeExports.jsx("button", { onClick: onClick, disabled: disabled, className: `${className} bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105`, children: isSubmitting ? '⏳ Processing...' : `🚀 ${text}` })),
                    clearButton: ({ onClick, disabled, className }) => (jsxRuntimeExports.jsx("button", { onClick: onClick, disabled: disabled, className: `${className} bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-colors`, children: "\uD83D\uDDD1\uFE0F Clear" })),
                    fileDisplay: ({ files, onRemove, disabled, className }) => (jsxRuntimeExports.jsx("div", { className: `${className} space-y-2`, children: files.map((file, index) => (jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between bg-white/90 backdrop-blur-sm border border-green-200 rounded-lg p-3", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3", children: [jsxRuntimeExports.jsx("span", { className: "text-green-600", children: "\uD83D\uDCC4" }), jsxRuntimeExports.jsx("span", { className: "font-medium", children: file.name }), jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-500", children: ["(", (file.size / 1024 / 1024).toFixed(2), " MB)"] })] }), jsxRuntimeExports.jsx("button", { onClick: () => onRemove(index), disabled: disabled, className: "text-red-500 hover:text-red-700 transition-colors", children: "\u274C" })] }, index))) })),
                    errorDisplay: ({ error, className }) => (jsxRuntimeExports.jsxs("div", { className: `${className} bg-red-100 border border-red-300 text-red-800 rounded-lg p-3 flex items-center space-x-2`, children: [jsxRuntimeExports.jsx("span", { className: "text-red-600", children: "\u26A0\uFE0F" }), jsxRuntimeExports.jsx("span", { children: error })] }))
                } }), jsxRuntimeExports.jsxs("div", { className: "mt-4 text-sm text-gray-500", children: [jsxRuntimeExports.jsx("p", { children: "\u2705 Custom voice button with recording state" }), jsxRuntimeExports.jsx("p", { children: "\u2705 Custom file button with accepted types" }), jsxRuntimeExports.jsx("p", { children: "\u2705 Custom submit button with loading state" }), jsxRuntimeExports.jsx("p", { children: "\u2705 Custom clear button styling" }), jsxRuntimeExports.jsx("p", { children: "\u2705 Enhanced file display with file info" }), jsxRuntimeExports.jsx("p", { children: "\u2705 Custom error display with icon" })] })] }));
};

/**
 * Example demonstrating custom prompt customization
 */
const CustomPromptsExample = () => {
    const [result, setResult] = React.useState(null);
    const [error, setError] = React.useState(null);
    // Example 1: Custom System Prompt
    const customSystemPromptExample = {
        provider: 'openai',
        apiKey: 'your-openai-api-key',
        model: 'gpt-3.5-turbo',
        systemPrompt: `You are a professional HR assistant specializing in candidate evaluation. 
    Your role is to analyze job applications and provide structured feedback.
    
    Guidelines:
    - Be professional and objective
    - Focus on relevant skills and experience
    - Identify potential red flags
    - Provide constructive feedback
    - Always maintain confidentiality`,
        extractStructuredData: true,
        schema: {
            "candidate_name": "Full name of the candidate",
            "relevant_experience": "Years of relevant work experience",
            "key_skills": "List of key technical and soft skills mentioned",
            "education": "Educational background and qualifications",
            "strengths": "Notable strengths and positive attributes",
            "concerns": "Any potential concerns or gaps",
            "overall_rating": "Overall rating from 1-10",
            "recommendation": "Hire/No Hire/Interview recommendation"
        },
        onAIResponse: (response) => {
            setResult(response);
            setError(null);
        },
        onAIError: (error) => {
            setError(error);
            setResult(null);
        }
    };
    // Example 2: Custom User Prompt Template
    const customUserPromptExample = {
        provider: 'anthropic',
        apiKey: 'your-anthropic-api-key',
        model: 'claude-3-haiku-20240307',
        userPromptTemplate: `Please analyze this job application:

Application Details:
{text}

Attached Documents:
{files}

Please provide a comprehensive evaluation focusing on:
1. Technical qualifications
2. Relevant experience
3. Cultural fit indicators
4. Potential concerns
5. Interview recommendations

Format your response as structured JSON data.`,
        extractStructuredData: true,
        onAIResponse: (response) => {
            setResult(response);
            setError(null);
        },
        onAIError: (error) => {
            setError(error);
            setResult(null);
        }
    };
    // Example 3: Advanced Custom Prompt Builder
    const advancedCustomPromptExample = {
        provider: 'openai',
        apiKey: 'your-openai-api-key',
        model: 'gpt-4',
        customPromptBuilder: (text, files, options) => {
            const hasResume = files?.some(f => f.name.toLowerCase().includes('resume') || f.name.toLowerCase().includes('cv'));
            const hasCoverLetter = files?.some(f => f.name.toLowerCase().includes('cover'));
            const systemPrompt = `You are an expert HR recruiter with 15+ years of experience in talent acquisition.
      
Your expertise includes:
- Technical skill assessment
- Cultural fit evaluation  
- Salary negotiation insights
- Interview preparation guidance
- Candidate experience optimization

${hasResume ? 'A resume/CV has been provided for analysis.' : 'No resume/CV was provided.'}
${hasCoverLetter ? 'A cover letter has been provided for analysis.' : 'No cover letter was provided.'}

Provide detailed, actionable insights that will help the hiring team make informed decisions.`;
            const userPrompt = `CANDIDATE APPLICATION ANALYSIS REQUEST

Application Text:
${text}

${files && files.length > 0 ? `Supporting Documents:
${files.map(f => `- ${f.name} (${(f.size / 1024).toFixed(1)}KB)`).join('\n')}` : 'No supporting documents provided.'}

ANALYSIS REQUIREMENTS:
Please provide a comprehensive analysis including:

1. CANDIDATE OVERVIEW
   - Professional summary
   - Key qualifications
   - Career progression

2. TECHNICAL ASSESSMENT
   - Required skills match
   - Technical depth evaluation
   - Learning potential

3. EXPERIENCE EVALUATION
   - Relevant work history
   - Achievement highlights
   - Industry experience

4. CULTURAL FIT
   - Communication style
   - Team collaboration indicators
   - Company values alignment

5. RISK ASSESSMENT
   - Potential concerns
   - Red flags
   - Mitigation strategies

6. RECOMMENDATION
   - Overall rating (1-10)
   - Next steps
   - Interview focus areas

Format your response as structured JSON with clear sections and actionable insights.`;
            return { systemPrompt, userPrompt };
        },
        extractStructuredData: true,
        onAIResponse: (response) => {
            setResult(response);
            setError(null);
        },
        onAIError: (error) => {
            setError(error);
            setResult(null);
        }
    };
    const handleSubmit = async (text, files) => {
        console.log('Form submitted:', text, files);
    };
    return (jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto p-6 space-y-8", children: [jsxRuntimeExports.jsxs("div", { className: "text-center", children: [jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Custom Prompts Examples" }), jsxRuntimeExports.jsx("p", { className: "text-lg text-gray-600", children: "Learn how to customize AI prompts for your specific use cases" })] }), jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-md p-6", children: [jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-4", children: "Example 1: Custom System Prompt" }), jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-4", children: "This example shows how to provide a custom system prompt that defines the AI's role and behavior." }), jsxRuntimeExports.jsx(ConversationalInput, { onSubmit: handleSubmit, aiProcessing: customSystemPromptExample, placeholder: "Paste a job application here to analyze...", enableFileUpload: true, acceptedFileTypes: ['.pdf', '.doc', '.docx', '.txt'], classNames: {
                            container: "border border-gray-300 rounded-lg",
                            textarea: "min-h-[120px] p-4",
                            actionBar: "bg-gray-50 p-3 border-t border-gray-200"
                        } })] }), jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-md p-6", children: [jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-4", children: "Example 2: Custom User Prompt Template" }), jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-4", children: "This example demonstrates using a custom user prompt template with placeholders for dynamic content." }), jsxRuntimeExports.jsx(ConversationalInput, { onSubmit: handleSubmit, aiProcessing: customUserPromptExample, placeholder: "Enter job application details...", enableFileUpload: true, acceptedFileTypes: ['.pdf', '.doc', '.docx', '.txt'], classNames: {
                            container: "border border-gray-300 rounded-lg",
                            textarea: "min-h-[120px] p-4",
                            actionBar: "bg-gray-50 p-3 border-t border-gray-200"
                        } })] }), jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-md p-6", children: [jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-4", children: "Example 3: Advanced Custom Prompt Builder" }), jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-4", children: "This example shows the most flexible approach using a custom prompt builder function that can adapt based on input content and files." }), jsxRuntimeExports.jsx(ConversationalInput, { onSubmit: handleSubmit, aiProcessing: advancedCustomPromptExample, placeholder: "Enter candidate information or paste application text...", enableFileUpload: true, acceptedFileTypes: ['.pdf', '.doc', '.docx', '.txt'], classNames: {
                            container: "border border-gray-300 rounded-lg",
                            textarea: "min-h-[120px] p-4",
                            actionBar: "bg-gray-50 p-3 border-t border-gray-200"
                        } })] }), (result || error) && (jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-md p-6", children: [jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-4", children: "AI Response" }), error && (jsxRuntimeExports.jsxs("div", { className: "bg-red-50 border border-red-200 rounded-lg p-4 mb-4", children: [jsxRuntimeExports.jsx("h3", { className: "text-red-800 font-medium", children: "Error:" }), jsxRuntimeExports.jsx("p", { className: "text-red-700", children: error })] })), result && (jsxRuntimeExports.jsxs("div", { className: "bg-green-50 border border-green-200 rounded-lg p-4", children: [jsxRuntimeExports.jsx("h3", { className: "text-green-800 font-medium mb-2", children: "Analysis Result:" }), jsxRuntimeExports.jsx("pre", { className: "bg-white p-3 rounded text-sm text-gray-800 overflow-auto max-h-96", children: JSON.stringify(result, null, 2) })] }))] })), jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-lg p-6", children: [jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-4", children: "Code Examples" }), jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "font-medium mb-2", children: "1. Custom System Prompt:" }), jsxRuntimeExports.jsx("pre", { className: "bg-white p-3 rounded text-sm overflow-auto", children: `<ConversationalInput
  aiProcessing={{
    provider: 'openai',
    apiKey: 'your-api-key',
    systemPrompt: \`You are a professional HR assistant specializing in candidate evaluation.
    Your role is to analyze job applications and provide structured feedback.\`,
    extractStructuredData: true,
    schema: {
      "candidate_name": "Full name of the candidate",
      "relevant_experience": "Years of relevant work experience",
      // ... more schema fields
    }
  }}
/>` })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "font-medium mb-2", children: "2. Custom User Prompt Template:" }), jsxRuntimeExports.jsx("pre", { className: "bg-white p-3 rounded text-sm overflow-auto", children: `<ConversationalInput
  aiProcessing={{
    provider: 'anthropic',
    apiKey: 'your-api-key',
    userPromptTemplate: \`Please analyze this job application:

Application Details:
{text}

Attached Documents:
{files}

Please provide a comprehensive evaluation...\`,
    extractStructuredData: true
  }}
/>` })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "font-medium mb-2", children: "3. Advanced Custom Prompt Builder:" }), jsxRuntimeExports.jsx("pre", { className: "bg-white p-3 rounded text-sm overflow-auto", children: `<ConversationalInput
  aiProcessing={{
    provider: 'openai',
    apiKey: 'your-api-key',
    customPromptBuilder: (text, files, options) => {
      const hasResume = files?.some(f => f.name.includes('resume'));
      
      return {
        systemPrompt: \`You are an expert HR recruiter...\`,
        userPrompt: \`CANDIDATE APPLICATION ANALYSIS REQUEST
Application Text: \${text}
\${hasResume ? 'Resume provided' : 'No resume'}\`
      };
    },
    extractStructuredData: true
  }}
/>` })] })] })] })] }));
};

/**
 * Live Demo showcasing ConversationalInput with Mistral Cloud
 * This demo allows users to test the component before downloading
 */
const MistralCloudDemo = () => {
    const [aiConfig, setAiConfig] = React.useState(null);
    const [aiResult, setAiResult] = React.useState(null);
    const [aiError, setAiError] = React.useState(null);
    const [inputText, setInputText] = React.useState('');
    const [activeDemo, setActiveDemo] = React.useState('basic');
    // Demo configurations
    const demos = {
        basic: {
            title: "Basic AI Processing",
            description: "Simple text processing with Mistral Cloud",
            config: {
                provider: 'mistral',
                model: 'mistral-large-latest',
                extractStructuredData: false,
                clarificationMode: false,
                onAIResponse: (response) => {
                    setAiResult(response);
                    setAiError(null);
                },
                onAIError: (error) => {
                    setAiError(error);
                    setAiResult(null);
                }
            }
        },
        custom: {
            title: "Custom System Prompt",
            description: "HR Assistant with custom role definition",
            config: {
                provider: 'mistral',
                model: 'mistral-large-latest',
                systemPrompt: `You are a professional HR assistant specializing in candidate evaluation and recruitment.

Your expertise includes:
- Analyzing job applications and resumes
- Identifying key skills and qualifications
- Providing structured feedback
- Making hiring recommendations
- Ensuring fair and unbiased evaluation

Guidelines:
- Be professional and objective in your analysis
- Focus on relevant skills and experience
- Identify both strengths and areas for improvement
- Provide actionable insights for hiring decisions
- Always maintain confidentiality and respect`,
                extractStructuredData: true,
                schema: {
                    "candidate_name": "Full name of the candidate",
                    "relevant_experience": "Years of relevant work experience",
                    "key_skills": "List of key technical and soft skills mentioned",
                    "education": "Educational background and qualifications",
                    "strengths": "Notable strengths and positive attributes",
                    "concerns": "Any potential concerns or gaps",
                    "overall_rating": "Overall rating from 1-10",
                    "recommendation": "Hire/No Hire/Interview recommendation with reasoning"
                },
                onAIResponse: (response) => {
                    setAiResult(response);
                    setAiError(null);
                },
                onAIError: (error) => {
                    setAiError(error);
                    setAiResult(null);
                }
            }
        },
        advanced: {
            title: "Advanced Custom Prompts",
            description: "Dynamic prompt generation based on input content",
            config: {
                provider: 'mistral',
                model: 'mistral-large-latest',
                customPromptBuilder: (text, files, options) => {
                    const hasResume = files?.some(f => f.name.toLowerCase().includes('resume') ||
                        f.name.toLowerCase().includes('cv'));
                    const hasCoverLetter = files?.some(f => f.name.toLowerCase().includes('cover'));
                    const systemPrompt = `You are an expert HR recruiter with 15+ years of experience in talent acquisition and candidate evaluation.

Your expertise includes:
- Technical skill assessment across various industries
- Cultural fit evaluation and team dynamics
- Salary negotiation insights and market analysis
- Interview preparation guidance and best practices
- Candidate experience optimization and employer branding

Current Analysis Context:
${hasResume ? '✅ Resume/CV has been provided for detailed analysis' : '❌ No resume/CV was provided - analysis will be based on text input only'}
${hasCoverLetter ? '✅ Cover letter has been provided for additional context' : '❌ No cover letter was provided'}

Provide detailed, actionable insights that will help the hiring team make informed decisions. Focus on both technical qualifications and cultural fit indicators.`;
                    const userPrompt = `🎯 CANDIDATE APPLICATION ANALYSIS REQUEST

📋 Application Details:
${text}

${files && files.length > 0 ? `📎 Supporting Documents:
${files.map(f => `- ${f.name} (${(f.size / 1024).toFixed(1)}KB)`).join('\n')}` : '📎 No supporting documents provided'}

🔍 ANALYSIS REQUIREMENTS:

1. 👤 CANDIDATE OVERVIEW
   - Professional summary and background
   - Key qualifications and achievements
   - Career progression and growth trajectory

2. 🛠️ TECHNICAL ASSESSMENT
   - Required skills match analysis
   - Technical depth and expertise evaluation
   - Learning potential and adaptability

3. 💼 EXPERIENCE EVALUATION
   - Relevant work history and accomplishments
   - Industry experience and domain knowledge
   - Leadership and collaboration indicators

4. 🤝 CULTURAL FIT
   - Communication style and clarity
   - Team collaboration indicators
   - Company values alignment assessment

5. ⚠️ RISK ASSESSMENT
   - Potential concerns or red flags
   - Gaps in experience or skills
   - Mitigation strategies and recommendations

6. 🎯 RECOMMENDATION
   - Overall rating (1-10) with detailed justification
   - Next steps and interview focus areas
   - Specific questions to ask during interviews

Format your response as structured JSON with clear sections, actionable insights, and specific examples from the application.`;
                    return { systemPrompt, userPrompt };
                },
                extractStructuredData: true,
                onAIResponse: (response) => {
                    setAiResult(response);
                    setAiError(null);
                },
                onAIError: (error) => {
                    setAiError(error);
                    setAiResult(null);
                }
            }
        }
    };
    const handleSubmit = async (text, files) => {
        console.log('Form submitted:', text, files);
        // This onSubmit will be called AFTER AI processing if aiProcessing is configured
    };
    const currentDemo = demos[activeDemo];
    return (jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50", children: [jsxRuntimeExports.jsx("div", { className: "bg-white shadow-sm border-b", children: jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6", children: jsxRuntimeExports.jsxs("div", { className: "text-center", children: [jsxRuntimeExports.jsxs("h1", { className: "text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3", children: [jsxRuntimeExports.jsx(lucideReact.Sparkles, { className: "w-10 h-10 text-purple-600" }), "ConversationalInput Live Demo"] }), jsxRuntimeExports.jsx("p", { className: "text-xl text-gray-600 mb-6", children: "Test the power of conversational AI input with Mistral Cloud" }), jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-sm text-gray-500", children: [jsxRuntimeExports.jsx(lucideReact.Bot, { className: "w-4 h-4" }), "Powered by Mistral Cloud AI"] })] }) }) }), jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold text-gray-900 mb-4", children: "Choose a Demo" }), jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: Object.entries(demos).map(([key, demo]) => (jsxRuntimeExports.jsxs("button", { onClick: () => setActiveDemo(key), className: `p-6 rounded-lg border-2 transition-all duration-200 text-left ${activeDemo === key
                                        ? 'border-purple-500 bg-purple-50 shadow-md'
                                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'}`, children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: demo.title }), jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600", children: demo.description }), activeDemo === key && (jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center text-purple-600", children: [jsxRuntimeExports.jsx(lucideReact.CheckCircle, { className: "w-4 h-4 mr-1" }), jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Active" })] }))] }, key))) })] }), jsxRuntimeExports.jsx("div", { className: "mb-8", children: jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-lg p-6", children: [jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2", children: [jsxRuntimeExports.jsx(lucideReact.Settings, { className: "w-6 h-6 text-blue-600" }), "AI Configuration"] }), jsxRuntimeExports.jsxs("p", { className: "text-gray-600 mb-4", children: ["Configure your Mistral Cloud API key to test the component.", jsxRuntimeExports.jsx("a", { href: "https://console.mistral.ai/", target: "_blank", rel: "noopener noreferrer", className: "text-blue-600 hover:text-blue-800 ml-1", children: "Get your API key here" })] }), jsxRuntimeExports.jsx(AIProviderConfig, { onConfigure: setAiConfig })] }) }), aiConfig && (jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-lg p-6", children: [jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2", children: [jsxRuntimeExports.jsx(lucideReact.MessageSquare, { className: "w-6 h-6 text-green-600" }), currentDemo.title] }), jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-4", children: currentDemo.description }), jsxRuntimeExports.jsx(ConversationalInput, { onSubmit: handleSubmit, placeholder: "Try typing something like: 'I'm a software engineer with 5 years of experience in React and Node.js, looking for a senior developer position...'", aiProcessing: {
                                            ...aiConfig,
                                            ...currentDemo.config
                                        }, value: inputText, onTextChange: setInputText, showClearButton: true, enableFileUpload: true, acceptedFileTypes: ['.pdf', '.doc', '.docx', '.txt'], maxFileSize: 10 * 1024 * 1024, classNames: {
                                            container: "border border-gray-300 rounded-lg shadow-sm",
                                            textarea: "min-h-[150px] p-4 text-base",
                                            actionBar: "bg-gray-100 p-3 flex justify-between items-center border-t border-gray-200",
                                            voiceButton: "bg-blue-600 text-white hover:bg-blue-700",
                                            fileButton: "bg-green-600 text-white hover:bg-green-700",
                                            submitButton: "bg-purple-600 text-white hover:bg-purple-700",
                                            clearButton: "bg-red-500 text-white hover:bg-red-600",
                                            fileDisplay: "p-2 bg-white border-t border-gray-200",
                                            errorDisplay: "p-3 bg-red-100 text-red-800 rounded-b-lg"
                                        } }), jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium text-gray-700 mb-2", children: "Try these sample inputs:" }), jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [
                                                    "I'm a marketing manager with 8 years of experience in digital marketing, SEO, and social media management.",
                                                    "Software developer specializing in Python, Django, and machine learning. I have a Master's in Computer Science.",
                                                    "Customer service representative with excellent communication skills and 3 years of experience in retail."
                                                ].map((sample, index) => (jsxRuntimeExports.jsx("button", { onClick: () => setInputText(sample), className: "block w-full text-left p-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded border border-gray-200", children: sample }, index))) })] })] }), jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [aiResult && (jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-lg p-6", children: [jsxRuntimeExports.jsxs("h3", { className: "text-xl font-semibold text-green-800 mb-3 flex items-center gap-2", children: [jsxRuntimeExports.jsx(lucideReact.CheckCircle, { className: "w-5 h-5" }), "AI Response"] }), jsxRuntimeExports.jsx("div", { className: "bg-green-50 border border-green-200 rounded-lg p-4", children: jsxRuntimeExports.jsx("pre", { className: "text-sm text-green-900 whitespace-pre-wrap overflow-auto max-h-96", children: typeof aiResult === 'string' ? aiResult : JSON.stringify(aiResult, null, 2) }) })] })), aiError && (jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-lg p-6", children: [jsxRuntimeExports.jsxs("h3", { className: "text-xl font-semibold text-red-800 mb-3 flex items-center gap-2", children: [jsxRuntimeExports.jsx(lucideReact.AlertCircle, { className: "w-5 h-5" }), "Error"] }), jsxRuntimeExports.jsx("div", { className: "bg-red-50 border border-red-200 rounded-lg p-4", children: jsxRuntimeExports.jsx("p", { className: "text-red-700", children: aiError }) })] })), jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-lg p-6", children: [jsxRuntimeExports.jsxs("h3", { className: "text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2", children: [jsxRuntimeExports.jsx(lucideReact.Star, { className: "w-5 h-5 text-yellow-500" }), "Component Features"] }), jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [jsxRuntimeExports.jsx(lucideReact.Mic, { className: "w-5 h-5 text-blue-600" }), jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-700", children: "Voice Input" })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [jsxRuntimeExports.jsx(lucideReact.Upload, { className: "w-5 h-5 text-green-600" }), jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-700", children: "File Upload" })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [jsxRuntimeExports.jsx(lucideReact.Zap, { className: "w-5 h-5 text-purple-600" }), jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-700", children: "AI Processing" })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [jsxRuntimeExports.jsx(lucideReact.Shield, { className: "w-5 h-5 text-red-600" }), jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-700", children: "Input Validation" })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [jsxRuntimeExports.jsx(lucideReact.Users, { className: "w-5 h-5 text-indigo-600" }), jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-700", children: "Custom Prompts" })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [jsxRuntimeExports.jsx(lucideReact.FileText, { className: "w-5 h-5 text-orange-600" }), jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-700", children: "Structured Output" })] })] })] }), jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-lg p-6", children: [jsxRuntimeExports.jsxs("h3", { className: "text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2", children: [jsxRuntimeExports.jsx(lucideReact.Code, { className: "w-5 h-5 text-gray-600" }), "Code Example"] }), jsxRuntimeExports.jsx("div", { className: "bg-gray-900 rounded-lg p-4 overflow-auto", children: jsxRuntimeExports.jsx("pre", { className: "text-sm text-green-400", children: `import { ConversationalInput } from '@junniepat/conversational-ai-input';

<ConversationalInput
  onSubmit={handleSubmit}
  aiProcessing={{
    provider: 'mistral',
    apiKey: 'your-mistral-api-key',
    model: 'mistral-large-latest',
    systemPrompt: 'You are a professional HR assistant...',
    extractStructuredData: true,
    schema: {
      "candidate_name": "Full name",
      "experience": "Years of experience"
    }
  }}
  placeholder="Tell me about yourself..."
  enableFileUpload={true}
  enableVoice={true}
/>` }) })] })] })] })), jsxRuntimeExports.jsxs("div", { className: "mt-12 bg-white rounded-xl shadow-lg p-8", children: [jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-6 text-center", children: "Ready to Use in Your Project?" }), jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-4", children: "Installation" }), jsxRuntimeExports.jsx("div", { className: "bg-gray-900 rounded-lg p-4 mb-4", children: jsxRuntimeExports.jsx("pre", { className: "text-sm text-green-400", children: `npm install @junniepat/conversational-ai-input

# or

yarn add @junniepat/conversational-ai-input

# or

pnpm add @junniepat/conversational-ai-input` }) })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-4", children: "Quick Start" }), jsxRuntimeExports.jsx("div", { className: "bg-gray-900 rounded-lg p-4", children: jsxRuntimeExports.jsx("pre", { className: "text-sm text-green-400", children: `import { ConversationalInput } from '@junniepat/conversational-ai-input';

function App() {
  return (
    <ConversationalInput
      onSubmit={(text, files) => console.log(text, files)}
      placeholder="Start typing..."
    />
  );
}` }) })] })] }), jsxRuntimeExports.jsx("div", { className: "text-center mt-8", children: jsxRuntimeExports.jsxs("a", { href: "https://github.com/mr-junniepat/conversational-input-oss", target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors", children: [jsxRuntimeExports.jsx(lucideReact.Play, { className: "w-4 h-4" }), "View on GitHub"] }) })] })] })] }));
};

const AIIntegrationExample = () => {
    const [aiResponse, setAIResponse] = React.useState(null);
    const [aiError, setAIError] = React.useState(null);
    const handleSubmit = async (text, files) => {
        console.log('Form submitted:', { text, files });
        // Your custom submission logic here
    };
    const handleAIResponse = (response) => {
        setAIResponse(response);
        setAIError(null);
        console.log('AI Response:', response);
    };
    const handleAIError = (error) => {
        setAIError(error);
        setAIResponse(null);
        console.error('AI Error:', error);
    };
    return (jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto p-6 space-y-6", children: [jsxRuntimeExports.jsxs("div", { className: "text-center", children: [jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-4", children: "AI Integration Examples" }), jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "See how easy it is to integrate AI processing with just an API key!" })] }), jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-6 border border-gray-200", children: [jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-4", children: "\uD83E\uDD16 OpenAI Integration" }), jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-4", children: "Just provide your OpenAI API key and the component handles everything!" }), jsxRuntimeExports.jsx(ConversationalInput, { onSubmit: handleSubmit, placeholder: "Tell me about your experience and I'll extract structured data...", aiProcessing: {
                            provider: 'openai',
                            apiKey: process.env.REACT_APP_OPENAI_API_KEY || 'your-openai-api-key',
                            model: 'gpt-3.5-turbo',
                            extractStructuredData: true,
                            schema: {
                                name: 'string',
                                experience: 'string',
                                skills: 'array',
                                location: 'string',
                                email: 'string'
                            },
                            onAIResponse: handleAIResponse,
                            onAIError: handleAIError
                        }, labels: {
                            submit: 'Process with AI'
                        } }), aiResponse && (jsxRuntimeExports.jsxs("div", { className: "mt-4 p-4 bg-green-50 border border-green-200 rounded-lg", children: [jsxRuntimeExports.jsx("h4", { className: "font-semibold text-green-900 mb-2", children: "AI Extracted Data:" }), jsxRuntimeExports.jsx("pre", { className: "text-sm text-green-800 overflow-auto", children: JSON.stringify(aiResponse, null, 2) })] })), aiError && (jsxRuntimeExports.jsxs("div", { className: "mt-4 p-4 bg-red-50 border border-red-200 rounded-lg", children: [jsxRuntimeExports.jsx("h4", { className: "font-semibold text-red-900 mb-2", children: "AI Error:" }), jsxRuntimeExports.jsx("p", { className: "text-sm text-red-800", children: aiError })] }))] }), jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-6 border border-gray-200", children: [jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-4", children: "\uD83C\uDFE0 LM Studio Integration" }), jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-4", children: "Use your local LM Studio instance for privacy-focused AI processing." }), jsxRuntimeExports.jsx(ConversationalInput, { onSubmit: handleSubmit, placeholder: "Ask me anything and I'll respond using your local AI model...", aiProcessing: {
                            provider: 'lmstudio',
                            endpoint: 'http://localhost:1234/v1/chat/completions',
                            model: 'openai/gpt-oss-20b',
                            clarificationMode: true,
                            onAIResponse: handleAIResponse,
                            onAIError: handleAIError
                        }, labels: {
                            submit: 'Ask Local AI'
                        } })] }), jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-6 border border-gray-200", children: [jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-4", children: "\uD83E\uDD99 Ollama Integration" }), jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-4", children: "Connect to your local Ollama instance for powerful local AI processing." }), jsxRuntimeExports.jsx(ConversationalInput, { onSubmit: handleSubmit, placeholder: "Describe your project and I'll help you plan it...", aiProcessing: {
                            provider: 'ollama',
                            endpoint: 'http://localhost:11434/api/generate',
                            model: 'mixtral',
                            maxTokens: 2000,
                            temperature: 0.7,
                            onAIResponse: handleAIResponse,
                            onAIError: handleAIError
                        }, labels: {
                            submit: 'Generate with Ollama'
                        } })] }), jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-6 border border-gray-200", children: [jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-4", children: "\uD83E\uDDE0 Anthropic Claude Integration" }), jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-4", children: "Use Claude for advanced reasoning and analysis." }), jsxRuntimeExports.jsx(ConversationalInput, { onSubmit: handleSubmit, placeholder: "Describe a complex problem and I'll help you solve it...", aiProcessing: {
                            provider: 'anthropic',
                            apiKey: process.env.REACT_APP_ANTHROPIC_API_KEY || 'your-anthropic-api-key',
                            model: 'claude-3-haiku-20240307',
                            maxTokens: 1500,
                            temperature: 0.3,
                            onAIResponse: handleAIResponse,
                            onAIError: handleAIError
                        }, labels: {
                            submit: 'Analyze with Claude'
                        } })] })] }));
};

/**
 * OpenAI Integration Example
 *
 * This example shows how to integrate ConversationalInput
 * with OpenAI's GPT models for intelligent data extraction and processing.
 */
const OpenAI = () => {
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [clarification, setClarification] = React.useState(null);
    const [extractedData, setExtractedData] = React.useState(null);
    const processWithOpenAI = async (text, files) => {
        try {
            setIsProcessing(true);
            // Simulate OpenAI API call
            const response = await fetch('/api/openai/process', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text,
                    files: files?.map(f => ({ name: f.name, size: f.size, type: f.type })),
                    model: 'gpt-4',
                    temperature: 0.1
                })
            });
            if (!response.ok)
                throw new Error('API call failed');
            const result = await response.json();
            if (result.needsClarification) {
                setClarification(result.clarificationQuestion);
            }
            else {
                setExtractedData(result.extractedData);
                setClarification(null);
            }
        }
        catch (error) {
            console.error('OpenAI processing error:', error);
            alert('Error processing with OpenAI');
        }
        finally {
            setIsProcessing(false);
        }
    };
    const handleClarify = async (response) => {
        try {
            setIsProcessing(true);
            // Send clarification response
            const result = await fetch('/api/openai/clarify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ response, context: extractedData })
            });
            if (!result.ok)
                throw new Error('Clarification failed');
            const clarifiedResult = await result.json();
            setExtractedData(clarifiedResult.extractedData);
            setClarification(null);
        }
        catch (error) {
            console.error('Clarification error:', error);
            alert('Error processing clarification');
        }
        finally {
            setIsProcessing(false);
        }
    };
    return (jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto p-6", children: [jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-4", children: "OpenAI Integration" }), jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-6", children: "Process conversational input with OpenAI GPT models for intelligent data extraction." }), jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx(ConversationalInput, { onSubmit: processWithOpenAI, isSubmitting: isProcessing, placeholder: "Describe your job experience, skills, and availability...", requireFiles: true, acceptedFileTypes: ['.pdf', '.doc', '.docx'], labels: {
                                    addAttachments: "Upload Resume",
                                    submit: "Process with AI"
                                } }), clarification && (jsxRuntimeExports.jsx("div", { className: "mt-4", children: jsxRuntimeExports.jsx(Clarifier, { question: clarification, onClarify: handleClarify, type: "info", suggestions: ["Yes", "No", "Maybe", "I'll provide more details"], showInput: true, inputPlaceholder: "Please clarify...", dismissible: true, onDismiss: () => setClarification(null) }) }))] }), jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold mb-3", children: "Extracted Data" }), extractedData ? (jsxRuntimeExports.jsx("pre", { className: "bg-white p-3 rounded border text-sm overflow-auto", children: JSON.stringify(extractedData, null, 2) })) : (jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Submit text and files to see AI-extracted data here..." }))] })] }), jsxRuntimeExports.jsxs("div", { className: "mt-6 text-sm text-gray-600", children: [jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-2", children: "Features:" }), jsxRuntimeExports.jsxs("ul", { className: "space-y-1", children: [jsxRuntimeExports.jsx("li", { children: "\u2705 OpenAI GPT-4 integration" }), jsxRuntimeExports.jsx("li", { children: "\u2705 Intelligent data extraction" }), jsxRuntimeExports.jsx("li", { children: "\u2705 Clarification system" }), jsxRuntimeExports.jsx("li", { children: "\u2705 File processing" }), jsxRuntimeExports.jsx("li", { children: "\u2705 Structured output" })] })] })] }));
};

/**
 * Local LLM Integration Example
 *
 * This example shows how to integrate ConversationalInput
 * with local LLMs like Ollama or LM Studio for privacy-focused, offline processing.
 */
const LocalLLM = () => {
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [modelStatus, setModelStatus] = React.useState('disconnected');
    const [extractedData, setExtractedData] = React.useState(null);
    const [modelInfo, setModelInfo] = React.useState(null);
    const checkModelConnection = async () => {
        try {
            setModelStatus('disconnected');
            // Check if local model is running
            const response = await fetch('http://localhost:11434/api/tags', {
                method: 'GET',
                signal: AbortSignal.timeout(5000) // 5 second timeout
            });
            if (response.ok) {
                const models = await response.json();
                setModelInfo(models);
                setModelStatus('connected');
                return true;
            }
            else {
                throw new Error('Model not responding');
            }
        }
        catch (error) {
            console.error('Model connection error:', error);
            setModelStatus('error');
            return false;
        }
    };
    const processWithLocalLLM = async (text, files) => {
        try {
            setIsProcessing(true);
            // Check model connection first
            const isConnected = await checkModelConnection();
            if (!isConnected) {
                alert('Local LLM not available. Please ensure Ollama or LM Studio is running.');
                return;
            }
            // Process with local model
            const response = await fetch('http://localhost:11434/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'mixtral', // or 'llama2', 'mistral', etc.
                    prompt: `Extract structured information from this text and return as JSON:
          
Text: ${text}

Files: ${files?.map(f => f.name).join(', ') || 'None'}

Please extract and return a JSON object with the following structure:
{
  "experience": "years of experience",
  "skills": ["skill1", "skill2"],
  "availability": "availability details",
  "location": "preferred location",
  "salary": "salary expectations"
}`,
                    stream: false,
                    options: {
                        temperature: 0.1,
                        top_p: 0.9,
                        max_tokens: 1000
                    }
                })
            });
            if (!response.ok)
                throw new Error('Local LLM processing failed');
            const result = await response.json();
            try {
                // Try to parse the response as JSON
                const extracted = JSON.parse(result.response);
                setExtractedData(extracted);
            }
            catch (parseError) {
                // If parsing fails, show the raw response
                setExtractedData({
                    rawResponse: result.response,
                    note: 'Response could not be parsed as JSON'
                });
            }
        }
        catch (error) {
            console.error('Local LLM processing error:', error);
            alert('Error processing with local LLM');
        }
        finally {
            setIsProcessing(false);
        }
    };
    return (jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto p-6", children: [jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-4", children: "Local LLM Integration" }), jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-6", children: "Process conversational input with local LLMs like Ollama or LM Studio for privacy and offline processing." }), jsxRuntimeExports.jsxs("div", { className: "mb-6 p-4 bg-gray-50 rounded-lg", children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold mb-3", children: "Model Status" }), jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [jsxRuntimeExports.jsx("div", { className: `w-3 h-3 rounded-full ${modelStatus === 'connected' ? 'bg-green-500' :
                                            modelStatus === 'error' ? 'bg-red-500' : 'bg-gray-400'}` }), jsxRuntimeExports.jsx("span", { className: "capitalize", children: modelStatus })] }), modelStatus === 'connected' && modelInfo && (jsxRuntimeExports.jsxs("div", { className: "text-sm text-gray-600", children: ["Available models: ", modelInfo.models?.map((m) => m.name).join(', ') || 'Unknown'] })), jsxRuntimeExports.jsx("button", { onClick: checkModelConnection, className: "px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors", children: "Check Connection" })] })] }), jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [jsxRuntimeExports.jsx("div", { children: jsxRuntimeExports.jsx(ConversationalInput, { onSubmit: processWithLocalLLM, isSubmitting: isProcessing, placeholder: "Describe your experience and requirements...", requireFiles: false, labels: {
                                submit: "Process with Local LLM"
                            } }) }), jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold mb-3", children: "Extracted Data" }), extractedData ? (jsxRuntimeExports.jsx("pre", { className: "bg-white p-3 rounded border text-sm overflow-auto", children: JSON.stringify(extractedData, null, 2) })) : (jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Submit text to see local LLM extracted data here..." }))] })] }), jsxRuntimeExports.jsxs("div", { className: "mt-6 text-sm text-gray-600", children: [jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-2", children: "Features:" }), jsxRuntimeExports.jsxs("ul", { className: "space-y-1", children: [jsxRuntimeExports.jsx("li", { children: "\u2705 Local LLM integration (Ollama, LM Studio)" }), jsxRuntimeExports.jsx("li", { children: "\u2705 Privacy-focused processing" }), jsxRuntimeExports.jsx("li", { children: "\u2705 Offline capability" }), jsxRuntimeExports.jsx("li", { children: "\u2705 Model status monitoring" }), jsxRuntimeExports.jsx("li", { children: "\u2705 Structured data extraction" })] }), jsxRuntimeExports.jsx("h4", { className: "font-semibold mt-3 mb-2", children: "Setup Instructions:" }), jsxRuntimeExports.jsxs("ol", { className: "list-decimal list-inside space-y-1 ml-4", children: [jsxRuntimeExports.jsxs("li", { children: ["Install Ollama: ", jsxRuntimeExports.jsx("code", { className: "bg-gray-200 px-1 rounded", children: "curl -fsSL https://ollama.ai/install.sh | sh" })] }), jsxRuntimeExports.jsxs("li", { children: ["Pull a model: ", jsxRuntimeExports.jsx("code", { className: "bg-gray-200 px-1 rounded", children: "ollama pull mixtral" })] }), jsxRuntimeExports.jsxs("li", { children: ["Start Ollama: ", jsxRuntimeExports.jsx("code", { className: "bg-gray-200 px-1 rounded", children: "ollama serve" })] })] })] })] }));
};

exports.AIIntegrationExample = AIIntegrationExample;
exports.AIProviderConfig = AIProviderConfig;
exports.AIServiceManager = AIServiceManager;
exports.BasicUsage = BasicUsage;
exports.Clarifier = Clarifier;
exports.ConversationalInput = ConversationalInput;
exports.CustomPromptsExample = CustomPromptsExample;
exports.CustomStyling = CustomStyling;
exports.FormIntegration = FormIntegration;
exports.LocalLLM = LocalLLM;
exports.LocalLLMExample = LocalLLM;
exports.MistralCloudDemo = MistralCloudDemo;
exports.OpenAI = OpenAI;
exports.OpenAIExample = OpenAI;
exports.RenderProps = RenderProps;
exports.aiServiceManager = aiServiceManager;
exports.default = ConversationalInput;
exports.useAIProcessing = useAIProcessing;
exports.useFileUpload = useFileUpload;
exports.useVoiceRecognition = useVoiceRecognition;
//# sourceMappingURL=index.js.map
