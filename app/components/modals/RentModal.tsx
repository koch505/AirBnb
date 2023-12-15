'use client';
import useRentModal from "../../hooks/useRentModal";
import CategoryInput from "../inputs/CategoryInput";
import Heading from "../Heading";
import { categoires } from "../navbar/Categories";
import Modal from "./Modal";
import { useMemo, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/IamgeUpload";
import Input from "../inputs/input";
import axios from "axios";
import toast from "react-hot-toast";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DECRIPTION = 4,
    PRICE = 5
}

const RentModal = () => {
    const [step, setStep] = useState(STEPS.CATEGORY);

    const rentModal = useRentModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors
        },
        reset
    } = useForm<FieldValues> ({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    });

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount'); 
    const imageSrc = watch('imageSrc');

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location])
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const onBack = () => {
        setStep((value) => value -1);
    }

    const onNext = () => {
        setStep((value) => value - 1);
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create'
        }
        return 'Next';
    }, [step]);

    const secondaryActionLabal = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }
        return "Back";
    }, [step]);

    let bodyContent = (
        <div
            className="flex flex-col gap-8"
        >
            <Heading 
                title="Which of these best descibes your place"
                subtitle="Pick a category"
            />
            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-3
                    max-h-[50vh]
                    overflow-y-auto
                "
            >
                {categoires.map(item => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput 
                            onClick={(category) => setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>

        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div
                className="
                    flex
                    flex-col
                    gap-8
                "
            >
                <Heading 
                    title="Where is your place located?"
                    subtitle="Help guests find you"
                />
                <CountrySelect 
                    onChange={(value) => setCustomValue('location', value) }
                    value={location}
                />
                <Map 
                    center={location?.latlng}
                />    
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div 
                className="
                   flex
                   flex-col
                   gap-4      
                "
            >
                <Heading 
                    title="Share some basics about your place"
                    subtitle="What amenties do you have?"
                />
                <Counter 
                    title="Guests"
                    subtitle="How many guests do you allow"
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                />
                <hr />
                <Counter 
                    title="Guests"
                    subtitle="How many guests do you allow"
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />
                <hr />
                <Counter 
                    title="Guests"
                    subtitle="How many guests do you allow"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                />    
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div
                className="flex flex-col gap-8"
            >
                <Heading 
                    title="Add a photo of your place"
                    subtitle="Show guests what your place looks like!"
                />
                <ImageUpload 
                    value={imageSrc}
                    onChange={(value) => {setCustomValue('imageSrc', value)}}
                />
            </div>
        )
    }

    if (step === STEPS.DECRIPTION) {
        bodyContent = (
            <div
                className="
                    flex
                    flex-col
                    gap-6
                "
            >
                <Heading 
                    title="How would you descibe your place?"
                    subtitle="Short and sweet works best"
                />
                <Input 
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input 
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div
                className="fle flex-col gap-8"
            >
                <Heading 
                    title="Now, set your price"
                    subtitle="How much do you charge per night?"
                />
                    <Input 
                        formatPrice
                        id="price"
                        label="Price"
                        type="number"
                        register={register}
                        disabled={isLoading}
                        errors={errors}
                        required
                    />
            </div>
        )
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }
        setIsLoading(true);
        axios.post('/api/listings', data)
        .then(() => {
            toast.success('Listing Created!');
            reset();
            setStep(STEPS.CATEGORY)
            rentModal.onClose();
        })
        .catch(() => {
            toast.error('Something went wrong');
        })
        .finally(() => {
            setIsLoading(false);
        })
    }
    
    return ( 
        <Modal 
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryLabel={secondaryActionLabal}
            secodearyAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="Airbnb your home!"
        />    
     );
}
 
export default RentModal;