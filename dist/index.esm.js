import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Mic, Upload, Loader2, FileText, XCircle, HelpCircle, CheckCircle, AlertCircle } from 'lucide-react';

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
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState(null);
    const [recognition, setRecognition] = useState(null);
    const isSupported = typeof window !== 'undefined' &&
        (window.SpeechRecognition || window.webkitSpeechRecognition);
    useEffect(() => {
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
    const startListening = useCallback(() => {
        if (recognition && !isListening) {
            try {
                recognition.start();
            }
            catch (err) {
                setError('Failed to start voice recognition');
            }
        }
    }, [recognition, isListening]);
    const stopListening = useCallback(() => {
        if (recognition && isListening) {
            try {
                recognition.stop();
            }
            catch (err) {
                setError('Failed to stop voice recognition');
            }
        }
    }, [recognition, isListening]);
    const resetTranscript = useCallback(() => {
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
    const [files, setFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const validateFile = useCallback((file) => {
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
    const addFiles = useCallback((newFiles) => {
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
    const removeFile = useCallback((index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    }, []);
    const clearFiles = useCallback(() => {
        setFiles([]);
    }, []);
    const updateUploadProgress = useCallback((progress) => {
        setUploadProgress(progress);
    }, []);
    const startUpload = useCallback(() => {
        setIsUploading(true);
        setUploadProgress(0);
    }, []);
    const finishUpload = useCallback(() => {
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
className = "", showClearButton = true, labels = {}, enableVoice = true, enableFileUpload = true, showSubmitButton = true, validateInput, isSubmitting = false, disabled = false, initialValue = "", value: controlledValue, onTextChange, onFilesChange, autoSubmitOnEnter = false, submitTrigger = 'both', clearAfterSubmit = true, classNames = {}, render, }) => {
    const [text, setText] = useState(initialValue);
    const [error, setError] = useState(null);
    const textareaRef = useRef(null);
    // Use controlled value if provided
    const displayText = controlledValue !== undefined ? controlledValue : text;
    const { isListening, isSupported: voiceSupported, startListening, stopListening, transcript, resetTranscript, } = useVoiceRecognition();
    const { files, addFiles, removeFile: removeFileFromHook, clearFiles, validateFile, } = useFileUpload(acceptedFileTypes, maxFileSize);
    // Merge voice transcript with typed text
    const fullText = displayText + (isListening ? transcript : '');
    // Handle text changes
    const handleTextChange = useCallback((newText) => {
        if (controlledValue === undefined) {
            setText(newText);
        }
        onTextChange?.(newText);
    }, [controlledValue, onTextChange]);
    // Handle file changes
    const handleFilesChange = useCallback((newFiles) => {
        onFilesChange?.(newFiles);
    }, [onFilesChange]);
    // Update files when they change
    useEffect(() => {
        handleFilesChange(files);
    }, [files, handleFilesChange]);
    const toggleMic = useCallback(() => {
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
    const handleFileUpload = useCallback((event) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            addFiles(selectedFiles);
        }
        // Reset the input value to allow selecting the same file again
        event.target.value = '';
    }, [addFiles]);
    const handleSubmit = useCallback(async () => {
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
    }, [fullText, files, requireFiles, validateInput, onSubmit, clearAfterSubmit, controlledValue, clearFiles, resetTranscript]);
    const clearText = useCallback(() => {
        if (controlledValue === undefined) {
            setText('');
        }
        resetTranscript();
        setError(null);
    }, [controlledValue, resetTranscript]);
    const handleRemoveFile = useCallback((index) => {
        removeFileFromHook(index);
    }, [removeFileFromHook]);
    // Handle Enter key for auto-submit
    const handleKeyDown = useCallback((event) => {
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
    const isSubmitDisabled = !fullText.trim() ||
        (requireFiles && files.length === 0) ||
        isSubmitting ||
        disabled ||
        submitTrigger === 'none';
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
        return (jsxRuntimeExports.jsxs("button", { onClick: toggleMic, disabled: disabled || isSubmitting, className: `flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium ${isListening ? 'border-green-300 bg-green-50 text-green-700' : ''} ${disabled || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`, "aria-pressed": isListening, children: [jsxRuntimeExports.jsx(Mic, { className: "w-4 h-4" }), finalLabels.useVoice] }));
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
        return (jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsx("input", { type: "file", id: "file-upload", accept: acceptedFileTypes.join(','), onChange: handleFileUpload, className: "hidden", multiple: true, disabled: disabled || isSubmitting }), jsxRuntimeExports.jsxs("label", { htmlFor: "file-upload", className: `cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium ${disabled || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`, children: [jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }), finalLabels.addAttachments] })] }));
    };
    const renderSubmitButton = () => {
        if (!showSubmitButton)
            return null;
        if (render?.submitButton) {
            return render.submitButton({
                onClick: handleSubmit,
                disabled: isSubmitDisabled,
                className: classNames.submitButton || "px-6 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed",
                isSubmitting,
                text: finalLabels.submit
            });
        }
        return (jsxRuntimeExports.jsx("button", { onClick: handleSubmit, disabled: isSubmitDisabled, className: "px-6 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed", children: isSubmitting ? (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx(Loader2, { className: "w-4 h-4 animate-spin inline mr-2" }), "Processing..."] })) : (finalLabels.submit) }));
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
        return (jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-2", children: files.map((file, index) => (jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-green-300 bg-green-50 text-green-700", children: [jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }), jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: file.name }), jsxRuntimeExports.jsx("button", { onClick: () => handleRemoveFile(index), className: "ml-2 p-1 text-green-600 hover:text-green-800 transition-colors", disabled: disabled || isSubmitting, children: jsxRuntimeExports.jsx(XCircle, { className: "w-3 h-3" }) })] }, index))) }));
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
    return (jsxRuntimeExports.jsxs("div", { className: `w-full max-w-3xl mx-auto ${className} ${classNames.container || ''}`, children: [jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden", children: [jsxRuntimeExports.jsxs("div", { className: "relative", children: [jsxRuntimeExports.jsx("textarea", { ref: textareaRef, className: `w-full h-[40vh] p-6 text-xl resize-none text-gray-900 placeholder-gray-500 border-none focus:outline-none ${isListening ? 'bg-green-50' : 'bg-white'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${classNames.textarea || ''}`, placeholder: placeholder, value: fullText, onChange: e => handleTextChange(e.target.value), onKeyDown: handleKeyDown, disabled: disabled || isSubmitting }), isListening && (jsxRuntimeExports.jsxs("div", { className: "absolute top-4 right-4 flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium", children: [jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full animate-pulse" }), finalLabels.listening] }))] }), (enableVoice || enableFileUpload || showSubmitButton || (showClearButton && fullText)) && (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("div", { className: "border-t border-gray-200" }), jsxRuntimeExports.jsxs("div", { className: `p-4 flex items-center justify-between ${classNames.actionBar || ''}`, children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [renderFileButton(), renderVoiceButton()] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [renderClearButton(), renderSubmitButton()] })] })] }))] }), renderErrorDisplay(), renderFileDisplay(), enableVoice && !voiceSupported && (jsxRuntimeExports.jsx("div", { className: "mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg text-yellow-700 text-sm", children: "Voice input is not supported in this browser. Please use text input instead." }))] }));
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
                return jsxRuntimeExports.jsx(AlertCircle, { className: "w-5 h-5 text-yellow-600" });
            case 'error':
                return jsxRuntimeExports.jsx(AlertCircle, { className: "w-5 h-5 text-red-600" });
            case 'success':
                return jsxRuntimeExports.jsx(CheckCircle, { className: "w-5 h-5 text-green-600" });
            default:
                return jsxRuntimeExports.jsx(HelpCircle, { className: "w-5 h-5 text-blue-600" });
        }
    };
    return (jsxRuntimeExports.jsx("div", { className: `rounded-lg border p-4 ${getTypeStyles()} ${className}`, children: jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [getIcon(), jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [jsxRuntimeExports.jsx("p", { className: "text-sm font-medium leading-relaxed", children: question }), dismissible && onDismiss && (jsxRuntimeExports.jsx("button", { onClick: onDismiss, className: "flex-shrink-0 p-1 hover:bg-white/20 rounded transition-colors", "aria-label": "Dismiss", children: jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) }))] }), suggestions.length > 0 && (jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [jsxRuntimeExports.jsx("p", { className: "text-xs font-medium mb-2 opacity-75", children: "Suggested responses:" }), jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: suggestions.map((suggestion, index) => (jsxRuntimeExports.jsx("button", { onClick: () => handleSuggestionClick(suggestion), className: "px-3 py-1 text-xs bg-white/50 hover:bg-white/70 rounded-full border border-current/20 transition-colors", children: suggestion }, index))) })] })), showInput && (jsxRuntimeExports.jsx("form", { onSubmit: handleSubmit, className: "mt-3", children: jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [jsxRuntimeExports.jsx("input", { type: "text", value: response, onChange: (e) => setResponse(e.target.value), placeholder: inputPlaceholder, className: "flex-1 px-3 py-2 text-sm bg-white/70 border border-current/20 rounded-md focus:outline-none focus:ring-2 focus:ring-current/40 focus:border-transparent" }), jsxRuntimeExports.jsx("button", { type: "submit", disabled: !response.trim(), className: "px-4 py-2 text-sm bg-current text-white rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity", children: "Submit" })] }) })), isExpanded && (jsxRuntimeExports.jsx("div", { className: "mt-3 pt-3 border-t border-current/20", children: jsxRuntimeExports.jsx("p", { className: "text-xs opacity-75", children: "This clarification helps us better understand your needs and provide more accurate assistance." }) }))] })] }) }));
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
    const [formData, setFormData] = useState({
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
 * OpenAI Integration Example
 *
 * This example shows how to integrate ConversationalInput
 * with OpenAI's GPT models for intelligent data extraction and processing.
 */
const OpenAI = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [clarification, setClarification] = useState(null);
    const [extractedData, setExtractedData] = useState(null);
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
    const [isProcessing, setIsProcessing] = useState(false);
    const [modelStatus, setModelStatus] = useState('disconnected');
    const [extractedData, setExtractedData] = useState(null);
    const [modelInfo, setModelInfo] = useState(null);
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

export { BasicUsage, BasicUsage as BasicUsageExample, Clarifier, ConversationalInput, CustomStyling, CustomStyling as CustomStylingExample, FormIntegration, FormIntegration as FormIntegrationExample, LocalLLM, LocalLLM as LocalLLMExample, OpenAI, OpenAI as OpenAIExample, RenderProps, RenderProps as RenderPropsExample, ConversationalInput as default, useFileUpload, useVoiceRecognition };
//# sourceMappingURL=index.esm.js.map
