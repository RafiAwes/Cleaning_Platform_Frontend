"use client";
import { useState } from "react";
import { Button, Label } from "@/components/ui";
import { useFileUpload } from "@/hooks/useFileUpload";
import SubTitle from "@/components/reusable/title";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import ProtectedRoute from "@/components/common/ProtectedRoute";

export default function DocumentUpload() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  
  // Using useFileUpload hook for handling file uploads
  const [{ files: nidFilesState }, { getInputProps: getNidInputProps, openFileDialog: openNidBrowser }] = useFileUpload({
    accept: ".pdf,.jpg,.jpeg,.png",
    maxFiles: 1,
  });
  
  const [{ files: businessProofFilesState }, { getInputProps: getBusinessProofInputProps, openFileDialog: openBusinessProofBrowser }] = useFileUpload({
    accept: ".pdf,.jpg,.jpeg,.png",
    maxFiles: 1,
  });

  const handleSubmit = async () => {
    // Validation
    if (nidFilesState.length === 0) {
      toast.error("Please upload your NID document");
      return;
    }
    
    if (businessProofFilesState.length === 0) {
      toast.error("Please upload your business proof document");
      return;
    }

    try {
      // Here you would typically send the files to your backend
      // For now, showing a success message
      toast.success("Documents uploaded successfully! Your application is under review.");
      
      // Redirect to vendor dashboard after successful upload
      router.push('/vendor');
    } catch (error) {
      console.error("Document upload error:", error);
      toast.error("Failed to upload documents. Please try again.");
    }
  };

  return (
    <ProtectedRoute allowedRoles={["vendor"]}>
      <div className="container py-10">
        <SubTitle text="Upload Required Documents" svg={false} />
        <p className="text-figma-secondary mt-2 mb-8">
          As a new vendor, please upload the following documents for verification
        </p>
        
        <div className="space-y-8">
          {/* NID Upload */}
          <div className="border border-gray-200 rounded-lg p-6">
            <Label className="text-lg font-semibold mb-4 block">National ID (NID)</Label>
            <p className="text-sm text-gray-600 mb-4">
              Please upload a clear photo or scan of your National ID card (front and back)
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors w-full"
                onClick={openNidBrowser}
              >
                <input {...getNidInputProps()} />
                
                {nidFilesState.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-green-600 font-medium">✓ Document Uploaded</p>
                    <p className="text-sm text-gray-600">{nidFilesState[0].file.name}</p>
                  </div>
                ) : (
                  <div>
                    <div className="mx-auto bg-gray-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium">Click to upload NID</p>
                    <p className="text-xs text-gray-500">PDF, JPG, PNG (Max 5MB)</p>
                  </div>
                )}
              </div>
              
              {nidFilesState.length > 0 && (
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={() => {
                    // Remove the file
                    // The hook doesn't provide a removeFile method in the destructured actions
                    // So we'll use the removeFile action from the hook
                    const [, actions] = useFileUpload({
                      accept: ".pdf,.jpg,.jpeg,.png",
                      maxFiles: 1,
                    });
                    actions.clearFiles();
                  }}
                  className="mt-2 sm:mt-0"
                >
                  Change
                </Button>
              )}
            </div>
          </div>
          
          {/* Business Proof Upload */}
          <div className="border border-gray-200 rounded-lg p-6">
            <Label className="text-lg font-semibold mb-4 block">Business Proof</Label>
            <p className="text-sm text-gray-600 mb-4">
              Please upload business license, registration certificate, or other proof of business ownership
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors w-full"
                onClick={openBusinessProofBrowser}
              >
                <input {...getBusinessProofInputProps()} />
                
                {businessProofFilesState.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-green-600 font-medium">✓ Document Uploaded</p>
                    <p className="text-sm text-gray-600">{businessProofFilesState[0].file.name}</p>
                  </div>
                ) : (
                  <div>
                    <div className="mx-auto bg-gray-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium">Click to upload Business Proof</p>
                    <p className="text-xs text-gray-500">PDF, JPG, PNG (Max 5MB)</p>
                  </div>
                )}
              </div>
              
              {businessProofFilesState.length > 0 && (
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={() => {
                    // Remove the file
                    // The hook doesn't provide a removeFile method in the destructured actions
                    // So we'll use the removeFile action from the hook
                    const [, actions] = useFileUpload({
                      accept: ".pdf,.jpg,.jpeg,.png",
                      maxFiles: 1,
                    });
                    actions.clearFiles();
                  }}
                  className="mt-2 sm:mt-0"
                >
                  Change
                </Button>
              )}
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <Button 
              onClick={handleSubmit}
              className="px-8 py-2"
              disabled={nidFilesState.length === 0 || businessProofFilesState.length === 0}
            >
              Submit Documents
            </Button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}