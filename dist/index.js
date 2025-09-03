'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var require$$0 = require('react');
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
	    var React = require$$0,
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
	        React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
	      hasOwnProperty = Object.prototype.hasOwnProperty,
	      isArrayImpl = Array.isArray,
	      createTask = console.createTask
	        ? console.createTask
	        : function () {
	            return null;
	          };
	    React = {
	      react_stack_bottom_frame: function (callStackForError) {
	        return callStackForError();
	      }
	    };
	    var specialPropKeyWarningShown;
	    var didWarnAboutElementRef = {};
	    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(
	      React,
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
    const [isListening, setIsListening] = require$$0.useState(false);
    const [transcript, setTranscript] = require$$0.useState('');
    const [error, setError] = require$$0.useState(null);
    const [recognition, setRecognition] = require$$0.useState(null);
    const isSupported = typeof window !== 'undefined' &&
        (window.SpeechRecognition || window.webkitSpeechRecognition);
    require$$0.useEffect(() => {
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
    const startListening = require$$0.useCallback(() => {
        if (recognition && !isListening) {
            try {
                recognition.start();
            }
            catch (err) {
                setError('Failed to start voice recognition');
            }
        }
    }, [recognition, isListening]);
    const stopListening = require$$0.useCallback(() => {
        if (recognition && isListening) {
            try {
                recognition.stop();
            }
            catch (err) {
                setError('Failed to stop voice recognition');
            }
        }
    }, [recognition, isListening]);
    const resetTranscript = require$$0.useCallback(() => {
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
    const [files, setFiles] = require$$0.useState([]);
    const [isUploading, setIsUploading] = require$$0.useState(false);
    const [uploadProgress, setUploadProgress] = require$$0.useState(0);
    const validateFile = require$$0.useCallback((file) => {
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
    const addFiles = require$$0.useCallback((newFiles) => {
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
    const removeFile = require$$0.useCallback((index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    }, []);
    const clearFiles = require$$0.useCallback(() => {
        setFiles([]);
    }, []);
    const updateUploadProgress = require$$0.useCallback((progress) => {
        setUploadProgress(progress);
    }, []);
    const startUpload = require$$0.useCallback(() => {
        setIsUploading(true);
        setUploadProgress(0);
    }, []);
    const finishUpload = require$$0.useCallback(() => {
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

const ConversationalInput = ({ onSubmit, placeholder = "Start typing or speaking naturally...", requireFiles = false, acceptedFileTypes = ['.pdf', '.doc', '.docx', '.txt'], maxFileSize = 10 * 1024 * 1024, // 10MB
className = "", showClearButton = true, labels = {}, enableVoice = true, enableFileUpload = true, validateInput, isSubmitting = false, disabled = false, }) => {
    const [text, setText] = require$$0.useState('');
    const [error, setError] = require$$0.useState(null);
    const { isListening, isSupported: voiceSupported, startListening, stopListening, transcript, resetTranscript, } = useVoiceRecognition();
    const { files, addFiles, removeFile: removeFileFromHook, clearFiles, validateFile, } = useFileUpload(acceptedFileTypes, maxFileSize);
    // Merge voice transcript with typed text
    const displayText = text + (isListening ? transcript : '');
    const toggleMic = require$$0.useCallback(() => {
        if (!voiceSupported) {
            setError('Voice input is not supported in this browser');
            return;
        }
        if (isListening) {
            stopListening();
            // Add the transcript to the main text
            setText(prev => prev + transcript);
            resetTranscript();
        }
        else {
            startListening();
        }
    }, [isListening, voiceSupported, startListening, stopListening, transcript, resetTranscript]);
    const handleFileUpload = require$$0.useCallback((event) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            addFiles(selectedFiles);
        }
        // Reset the input value to allow selecting the same file again
        event.target.value = '';
    }, [addFiles]);
    const handleSubmit = require$$0.useCallback(async () => {
        if (!displayText.trim()) {
            setError('Please enter some text before submitting');
            return;
        }
        if (requireFiles && files.length === 0) {
            setError('Please upload at least one file before submitting');
            return;
        }
        if (validateInput) {
            const validationError = validateInput(displayText);
            if (validationError) {
                setError(validationError);
                return;
            }
        }
        setError(null);
        try {
            await onSubmit(displayText, files);
            // Clear form after successful submission
            setText('');
            clearFiles();
            resetTranscript();
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Submission failed');
        }
    }, [displayText, files, requireFiles, validateInput, onSubmit, clearFiles, resetTranscript]);
    const clearText = require$$0.useCallback(() => {
        setText('');
        resetTranscript();
        setError(null);
    }, [resetTranscript]);
    const handleRemoveFile = require$$0.useCallback((index) => {
        removeFileFromHook(index);
    }, [removeFileFromHook]);
    const defaultLabels = {
        submit: 'Submit',
        clear: 'Clear text',
        addAttachments: 'add attachments',
        useVoice: 'use voice',
        listening: 'Listening...',
        cvReady: 'File Ready ✓',
    };
    const finalLabels = { ...defaultLabels, ...labels };
    return (jsxRuntimeExports.jsxs("div", { className: `w-full max-w-3xl mx-auto ${className}`, children: [jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden", children: [jsxRuntimeExports.jsxs("div", { className: "relative", children: [jsxRuntimeExports.jsx("textarea", { className: `w-full h-[40vh] p-6 text-xl resize-none text-gray-900 placeholder-gray-500 border-none focus:outline-none ${isListening ? 'bg-green-50' : 'bg-white'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`, placeholder: placeholder, value: displayText, onChange: e => setText(e.target.value), disabled: disabled || isSubmitting }), isListening && (jsxRuntimeExports.jsxs("div", { className: "absolute top-4 right-4 flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium", children: [jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full animate-pulse" }), finalLabels.listening] }))] }), jsxRuntimeExports.jsx("div", { className: "border-t border-gray-200" }), jsxRuntimeExports.jsxs("div", { className: "p-4 flex items-center justify-between", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [enableFileUpload && (jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsx("input", { type: "file", id: "file-upload", accept: acceptedFileTypes.join(','), onChange: handleFileUpload, className: "hidden", multiple: true, disabled: disabled || isSubmitting }), jsxRuntimeExports.jsxs("label", { htmlFor: "file-upload", className: `cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium ${disabled || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`, children: [jsxRuntimeExports.jsx(lucideReact.Upload, { className: "w-4 h-4" }), finalLabels.addAttachments] })] })), enableVoice && voiceSupported && (jsxRuntimeExports.jsxs("button", { onClick: toggleMic, disabled: disabled || isSubmitting, className: `flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium ${isListening ? 'border-green-300 bg-green-50 text-green-700' : ''} ${disabled || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`, "aria-pressed": isListening, children: [jsxRuntimeExports.jsx(lucideReact.Mic, { className: "w-4 h-4" }), finalLabels.useVoice] }))] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [showClearButton && displayText && (jsxRuntimeExports.jsx("button", { onClick: clearText, disabled: disabled || isSubmitting, className: "px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50", children: finalLabels.clear })), jsxRuntimeExports.jsx("button", { onClick: handleSubmit, disabled: !displayText.trim() || (requireFiles && files.length === 0) || isSubmitting || disabled, className: "px-6 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed", children: isSubmitting ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(lucideReact.Loader2, { className: "w-4 h-4 animate-spin inline mr-2" }), "Processing..."] })) : (finalLabels.submit) })] })] })] }), error && (jsxRuntimeExports.jsx("div", { className: "mt-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm", children: error })), files.length > 0 && (jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-2", children: files.map((file, index) => (jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-green-300 bg-green-50 text-green-700", children: [jsxRuntimeExports.jsx(lucideReact.FileText, { className: "w-4 h-4" }), jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: file.name }), jsxRuntimeExports.jsx("button", { onClick: () => handleRemoveFile(index), className: "ml-2 p-1 text-green-600 hover:text-green-800 transition-colors", disabled: disabled || isSubmitting, children: jsxRuntimeExports.jsx(lucideReact.XCircle, { className: "w-3 h-3" }) })] }, index))) })), enableVoice && !voiceSupported && (jsxRuntimeExports.jsx("div", { className: "mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg text-yellow-700 text-sm", children: "Voice input is not supported in this browser. Please use text input instead." }))] }));
};

exports.ConversationalInput = ConversationalInput;
exports.default = ConversationalInput;
exports.useFileUpload = useFileUpload;
exports.useVoiceRecognition = useVoiceRecognition;
//# sourceMappingURL=index.js.map
