import React, { useEffect, useRef } from 'react';

const ShareModal = ({ onClose, title, fullDescription }) => {
    const modalRef = useRef(); 

    const images = [
        { src: '../src/assets/copy.svg', alt: 'Copy', class: 'copy' },
        { src: '../src/assets/telegram.svg', alt: 'Telegram', class: 'telegram' },
        { src: '../src/assets/vk.svg', alt: 'VK', class: 'vk' },
        { src: '../src/assets/whatsapp.svg', alt: 'WhatsApp', class: 'whatsapp' },
        { src: '../src/assets/facebook.svg', alt: 'Facebook', class: 'facebook' }
    ];

    const handleCopy = () => {
        const taskText = `${title} ${fullDescription}`;
        navigator.clipboard.writeText(taskText).then(() => {
            alert('Текст успешно скопирован');
        }).catch(err => {
            console.error('Что-то пошло не так: ', err);
        });
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose(); // Закрываем модальное окно
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside); // Добавляем обработчик событий при монтировании
        return () => {
            document.removeEventListener('mousedown', handleClickOutside); // Удаляем обработчик при размонтировании
        };
    }, []);

    return (
        <div className="share-section background">
            <div className="share-window" ref={modalRef}>
                <ul className="menu">
                    {images.map(image => (
                        <li key={image.alt}>
                            <img
                                className={image.class}
                                src={image.src}
                                alt={image.alt}
                                onClick={image.class === 'copy' ? handleCopy : undefined} // Обработка клика для кнопки "Копировать"
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ShareModal;
