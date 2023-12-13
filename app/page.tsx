'use client';

import { useTranslation } from "react-i18next";

export default function Home() {
  
  const {t, i18n} = useTranslation();

  return (
    <div className="text-rose-500 text-2xl pt-40">
      {t('Hello Airbnb!')}
    </div>    
  )
}
