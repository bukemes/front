/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Media management page, allows users to upload and manage images, videos etc.
import React, {useState, useEffect} from 'react';
import { Label, FileInput, Modal, TextInput, Checkbox, Button, Card } from 'flowbite-react';
import Section from '../components/Section';
import {
    HiTrash
} from 'react-icons/hi';
import { v4 as uuidv4 } from 'uuid';
import { api } from '../utilities/api';
import FormData from 'form-data';

type ModalProps = {
    isModalVisible: boolean;
    showModal: () => void;
};

export default function MediaPage() {
    const [image, setImage] = useState(null); // image to upload
    const [images, setImages]: Array<any> = useState([]); // gallery of images
        
    return (
        <>
            <FileUpload  image={image} setImage={setImage} />
            <FilePreview image={image} setImage={setImage} images={images} setImages={setImages} />
            <MediaGallery images={images} setImages={setImages} />
            {/* <UploadAndDisplayImage />
            <Button onClick={showModal}>
                Toggle modal
            </Button>
            <UploadModal isModalVisible={isModalVisible} showModal={showModal} /> */}
        </>
    );
}

function FileUpload({ image, setImage }: any) {
    return (
        <>
            {/* Upload Section */}
            <Section>
                <div id="fileUpload" >
                    <div className="mb-2 block">
                        <Label
                            htmlFor="file"
                            value="Upload file"
                        />
                    </div>
                    <div className='max-w-sm'>
                        <FileInput
                            id="file"
                            helperText="Any image you want to upload to use in your website" 
                            onChange={(e: any) => {setImage(e.target.files[0]);}}
                            name='media'
                        />
                    </div> 
                </div>
            </Section>
        </>
    );
}

function FilePreview({image, setImage, images, setImages}: any) {
    return (
        <>
            {/* Preview & Form */}
            {image ? (
                <Section>
                    <div style={{
                        maxWidth: '250px',
                        maxHeight: '250px',
                    }} 
                    className="dark:bg-gray-700 bg-gray-200
                               rounded mr-5
                               flex items-center justify-center">
                        <img style={{
                            maxWidth:'100%',
                            maxHeight:'100%'
                        }} alt="upload preview" src={URL.createObjectURL(image)}  />
                    </div>
                    <div>
                        <FileUploadForm image={image} setImage={setImage} images={images} setImages={setImages} />
                    </div>
                </Section>
            ) : null}
        </>
    );
}

function FileUploadForm({ image, setImage, images, setImages }: any) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    // const filename = uuidv4();
    

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const data = new FormData();
        data.append('media', image);

        const config = {
            params: { 
                type: image.type,
                title: title,
                description: description
            }
        };

        api.post('media/upload', data, config)
            .then(res => {
                setImages([...images, res.data.image]);
            })
            .catch(err => {
                console.log(err);
            }  
            );
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="title"
                        value="Title"
                    />
                </div>
                <TextInput
                    id="title"
                    type="text"
                    required={true}
                    onChange={(e: any) => {setTitle(e.target.value);}}
                />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="description"
                        value="Description"
                    />
                </div>
                <TextInput
                    id="description"
                    type="text"
                    onChange={(e: any) => {setDescription(e.target.value);}}
                />
            </div>
            <div className='flex flex-row flex-wrap gap-2'>
                <Button 
                    onClick={()=>setImage(null)}
                    color="failure"
                ><HiTrash className="h-5 w-5" /></Button>

                <Button type="submit">Upload</Button>
            </div>
        </form>
    );
}

function MediaGallery({ images, setImages} : any) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError]: any = useState(null);
    
    const baseURL = 'http://localhost:9002/api/img/';

    function getSetImages(){
        api.get('media')
            .then(res => {
                setImages(res.data);
            }).catch(err => {
                console.log(err);
                setError(err.data);
            }
            );
    }

    useEffect(() => {
        getSetImages();
    } , []);

    const handleDelete = (_id: string) => {
        setIsLoading(true);
        api.delete(`media/${_id}`)
            .then(res => {
                const tempImages: Array<any> = images.filter((image: any) => {
                    return image._id !== _id;
                });
                setImages(tempImages);
                setIsLoading(false);
            }).catch(err => {
                console.log(err);
                setError(err.data);
                setIsLoading(false);
            }
            );
    };

    const Items = () => {
        return (
            <>
                {
                    images.map((image: any) => {
                        return (
                            <div key={image._id}
                                style={{
                                    width: 'calc(50% - 0.25rem)',
                                    height: '200px',
                                    minWidth: '200px',
                                    // minHeight: minWidth,
                                    backgroundImage: `url(${baseURL}${image.filename})`,
                                    backgroundSize: 'cover',
                                }}  
                                className="dark:bg-gray-7a00 bg-gray-200 
                                relative rounded flex items-center justify-center">

                                {/* <img style={{
                                    // maxWidth:'100%',
                                    // maxHeight:'100%',
                                    objectFit: 'cover'
                                }} crossOrigin='anonymous' 
                                src={baseURL + image.filename} alt={image.title} /> */}

                                <div className='absolute z-1 top-0 right-0 p-3'>
                                    <Button 
                                        size={'sm'}
                                        onClick={() => handleDelete(image._id)} 
                                        color="failure">
                                        <HiTrash className="h-5 w-5" />
                                    </Button>
                                </div>
                    
                            </div>

                        );
                    })
                }
            </>
        );
    };

    return (
        <>
            {/* Gallery */}
            {error ? (
                <div className='text-red-600'>
                    <h1>{error}</h1>
                </div>
            ) : null}
            <Section className={'gap-2'} >  {/* padding:0 to add gap between the images */}
                { images ? <Items /> : null }   
            </Section>
        </>
    );
}