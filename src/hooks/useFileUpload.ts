import { useState, useCallback } from 'react';
import { FileUploadHook } from '../types';

export function useFileUpload(
  acceptedTypes: string[] = ['*'],
  maxSize: number = 10 * 1024 * 1024 // 10MB default
): FileUploadHook {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const validateFile = useCallback((file: File): string | null => {
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

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    const validFiles: File[] = [];
    const errors: string[] = [];

    fileArray.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      console.warn('File validation errors:', errors);
    }

    setFiles(prev => [...prev, ...validFiles]);
  }, [validateFile]);

  const removeFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
  }, []);

  const updateUploadProgress = useCallback((progress: number) => {
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
