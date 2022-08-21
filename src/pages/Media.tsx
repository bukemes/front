// Media management page, allows users to upload and manage images, videos etc.
import React, { useContext } from 'react';
import { Label, FileInput } from 'flowbite-react';
import { AuthContext } from '../contexts/AuthContext';


export default function MediaPage() {
    // const authState = useContext(AuthContext);
    
    return (
        <>
            {/* MediaPage */}
            <FileUpload />
            <br></br>
            {/* <pre>{JSON.stringify(authState)}</pre> */}
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