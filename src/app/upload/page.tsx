import { UploadForm } from "@/components/upload/upload-form";
import { UploadedStatements } from "@/components/upload/uploaded-statements";

export default function UploadPage() {
  return (
    <div className="space-y-6">
      <UploadForm />
      <UploadedStatements />
    </div>
  );
}
