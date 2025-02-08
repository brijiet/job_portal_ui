import { Popover, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';


const PopoverHover = ({ title, body, handlePopover }: any) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const timeoutDuration = 200
    let timeout: any

    const closePopover = () => {
        return buttonRef.current?.dispatchEvent(
            new KeyboardEvent("keydown", {
                key: "Escape",
                bubbles: true,
                cancelable: true
            })
        )
    }

    const onMouseEnter = (open: any) => {
        clearTimeout(timeout)
        if (open) return
        return buttonRef.current?.click()
    }

    const onMouseLeave = (open: any) => {
        if (!open) return
        timeout = setTimeout(() => closePopover(), timeoutDuration)
    }

    return (
        <div className="w-full h-full">
            <Popover className="relative w-full h-full">
                {({ open }) => {
                    return (
                        <div onMouseLeave={onMouseLeave.bind(null, open)} className="h-full">
                            <Popover.Button
                                onClick={(event) => {
                                    if (open) {
                                        event.preventDefault();
                                        handlePopover()
                                    }
                                }}
                                className="w-full h-full outline-none"
                                ref={buttonRef}
                                onMouseEnter={onMouseEnter.bind(null, open)}
                                onMouseLeave={onMouseLeave.bind(null, open)}
                            >
                                {title}
                            </Popover.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel className="absolute top-full -left-36 z-10 w-auto">
                                    <div
                                        className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 w-full"
                                        onMouseEnter={onMouseEnter.bind(null, open)}
                                        onMouseLeave={onMouseLeave.bind(null, open)}
                                    >
                                        {body}
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </div>
                    )
                }}
            </Popover>
        </div>
    )
}
export default PopoverHover;