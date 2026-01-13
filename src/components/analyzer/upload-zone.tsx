'use client';

import { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Upload,
  FileText,
  File,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'success' | 'error';
  id: string;
}

interface UploadZoneProps {
  onFilesUploaded?: (files: UploadedFile[]) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
}

export function UploadZone({
  onFilesUploaded,
  maxFiles = 10,
  maxSize = 10
}: UploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const acceptedTypes = ['.txt', '.pdf', '.docx', '.doc'];

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return FileText;
    if (type.includes('word') || type.includes('document')) return FileText;
    return File;
  };

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }

    // Check file type
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedTypes.includes(extension)) {
      return `File type not supported. Please upload ${acceptedTypes.join(', ')} files`;
    }

    return null;
  };

  const processFiles = useCallback((fileList: FileList) => {
    const newFiles: UploadedFile[] = [];

    Array.from(fileList).forEach((file, index) => {
      if (files.length + newFiles.length >= maxFiles) return;

      const validation = validateFile(file);
      const uploadedFile: UploadedFile = {
        name: file.name,
        size: file.size,
        type: file.type,
        status: validation ? 'error' : 'uploading',
        id: `${Date.now()}-${index}`,
      };

      newFiles.push(uploadedFile);

      // Simulate upload process
      if (!validation) {
        setTimeout(() => {
          setFiles(prevFiles =>
            prevFiles.map(f =>
              f.id === uploadedFile.id
                ? { ...f, status: 'success' as const }
                : f
            )
          );
        }, 1000 + Math.random() * 2000);
      }
    });

    setFiles(prevFiles => [...prevFiles, ...newFiles]);
    onFilesUploaded?.(newFiles);
  }, [files, maxFiles, onFilesUploaded]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  }, [processFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      // Reset input value so the same file can be selected again
      e.target.value = '';
    }
  }, [processFiles]);

  const removeFile = (id: string) => {
    setFiles(prevFiles => prevFiles.filter(f => f.id !== id));
  };

  const clearAll = () => {
    setFiles([]);
  };

  return (
    <div className="space-y-4">
      <Card
        className={`border-2 border-dashed transition-all duration-200 ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-slate-300 hover:border-slate-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <div className={`mb-4 rounded-full p-3 ${
            dragActive ? 'bg-blue-100' : 'bg-slate-100'
          }`}>
            <Upload className={`h-8 w-8 ${
              dragActive ? 'text-blue-600' : 'text-slate-500'
            }`} />
          </div>

          <h3 className="mb-2 text-lg font-semibold text-slate-900">
            Drop files here or click to browse
          </h3>

          <p className="mb-4 text-sm text-slate-500">
            Upload contracts, proposals, or scope documents for AI analysis
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {acceptedTypes.map(type => (
              <Badge key={type} variant="secondary" className="text-xs">
                {type.toUpperCase()}
              </Badge>
            ))}
          </div>

          <div className="text-xs text-slate-400 mb-4">
            Max {maxFiles} files, up to {maxSize}MB each
          </div>

          <input
            type="file"
            multiple
            accept={acceptedTypes.join(',')}
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
          />

          <Button
            asChild
            variant="outline"
            className="border-blue-500 text-blue-600 hover:bg-blue-50"
          >
            <label htmlFor="file-upload" className="cursor-pointer">
              Select Files
            </label>
          </Button>
        </CardContent>
      </Card>

      {/* Uploaded files list */}
      {files.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-slate-900">
                Uploaded Files ({files.length})
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="text-slate-500 hover:text-slate-700"
              >
                Clear All
              </Button>
            </div>

            <div className="space-y-3">
              {files.map((file) => {
                const FileIcon = getFileIcon(file.type);

                return (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-md bg-slate-100">
                        <FileIcon className="h-4 w-4 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {file.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {file.status === 'uploading' && (
                        <Badge variant="secondary">
                          Uploading...
                        </Badge>
                      )}
                      {file.status === 'success' && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                      {file.status === 'error' && (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.id)}
                        className="h-6 w-6 p-0 text-slate-400 hover:text-slate-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}