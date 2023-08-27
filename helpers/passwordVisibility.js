import { useState } from "react";

export const togglePasswordVisibility = () => {

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [show, setShow] = useState('Показати')
  
  const handlePasswordVisibility = () => {
    if (show === 'Показати') {
      setShow('Сховати');
      setPasswordVisibility(!passwordVisibility);
    } else if (show === 'Сховати') {
      setShow('Показати');
      setPasswordVisibility(!passwordVisibility);
    }
  };

    return {
      passwordVisibility,
      show,
      handlePasswordVisibility
    }
};