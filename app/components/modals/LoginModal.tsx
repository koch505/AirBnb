'use client';

import { signIn } from 'next-auth/react';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import { useState, useCallback } from 'react';

import {
    FieldValues, 
    SubmitHandler, 
    useForm
} from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/input';
import toast from 'react-hot-toast';
import Button from '../Button';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    
    const {
        register, 
        handleSubmit,
        formState: {
            errors,
        }
     } = useForm<FieldValues>({
            defaultValues: {
                email: '',
                password: '',
            }
        })
    

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        console.log(data);
        signIn('credentials', {
            ...data,
            redirect: false
        })
        .then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                toast.success('logged in'); 
                router.refresh();
                loginModal.onClose();
            }
            if (callback?.error) {
                toast.error(callback.error);
            }
        })
        
    }
    
    const bodyContent = (
        <div
            className='
                flex
                flex-col
                gap-4
            '
        >
            <Heading 
                title='Welcome to back'
                subtitle='login to your account'
            />
            <Input 
                id='email'
                type='email'
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id='password'
                type='password'
                label='password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )
    
    const footerContent = (
        <div
            className='
                flex
                flex-col
                gap-4
                mt-3
            '
        >
            <hr />
            <Button 
                outline
                label='COntinue with Google'
                Icon={FcGoogle}
                onClick={() => {}}
            />
             <Button 
                outline
                label='COntinue with Github'
                Icon={AiFillGithub}
                onClick={() => {}}
            />
            <div
                className='
                text-neutral-500
                text-center
                mt-4
                font-light
                '
            >
                <div 
                    className='
                        flex 
                        flex-row
                        items-center
                        gap-2
                        justify-center
                    '
                >
                    <div>
                        Already have an account?
                    </div>
                    <div
                        className='
                            text-neutral-800
                            cursor-pointer
                            hover:underline
                        '
                        onClick={registerModal.onClose}
                    >
                        Log in
                    </div>
                </div>

            </div>
        </div>
    )
    
    return ( 
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title='Login'
            actionLabel='Continue'
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
        
     );
}
 
export default LoginModal;