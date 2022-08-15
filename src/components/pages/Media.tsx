// Media management page, allows users to upload and manage images, videos etc.
import React from 'react';
import { Label, FileInput } from 'flowbite-react';


export default function MediaPage() {

    return (
        <>
            {/* MediaPage */}
            <FileUpload />
        </>
    );
}

function FileUpload() {
    return (
        <>
            <div id="fileUpload">
                <div className="mb-2 block">
                    <Label
                        htmlFor="file"
                        value="Upload file"
                    />
                </div>
                <FileInput
                    id="file"
                    helperText="Any image you want to upload to use in your website" 
                />
            </div>
        </>
    );
}