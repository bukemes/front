import React from 'react';
import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function FooterComponent() {
    return (
        <footer className='w-full rounded bg-white shadow dark:bg-gray-800 md:flex md:items-center md:justify-between p-5'>
            <Footer.Copyright
                href="https://lavrenov.io"
                by="Andrei Lavrenov"
                year={2022}
            />
            <Footer.LinkGroup>
                {/* <Footer.Link href='/about'>
                About
                </Footer.Link> */}
                
                <li className='last:mr-0 md:mr-6'>
                    <Link to="/privacy">
                        Privacy Policy
                    </Link>
                </li>
                <li className='last:mr-0 md:mr-6'>
                    <Link to="/tos">
                        Terms
                    </Link>
                </li>
                
                {/* <Link to="#">
                Contact
                </Link> */}
            </Footer.LinkGroup>
        </footer>
    );
}