import { FireIcon, CheckIcon, XIcon, ExclamationIcon } from '@heroicons/react/solid'
import ProgressBar from './ProgressBar';
import { TOAST_VARIANTS } from '../../packages/toasts/constants';

const IconColors={
    info:"inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-200 text-blue-500 dark:bg-blue-800 dark:text-blue-200",
    success:"inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-200 text-green-500 dark:bg-green-800 dark:text-green-200",
    warning:"inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-200 text-yellow-500 dark:bg-yellow-800 dark:text-yellow-200",
    error:"inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-200 text-red-500 dark:bg-red-800 dark:text-red-200"
};

const IconRenderer=(category)=>{
    switch (category) {
        case TOAST_VARIANTS.WARNING:
            return <ExclamationIcon className="h-4 w-4"/>
        case TOAST_VARIANTS.ERROR:
            return <XIcon className="h-4 w-4"/>
        case TOAST_VARIANTS.SUCCESS:
            return <CheckIcon className="h-4 w-4"/>
        case TOAST_VARIANTS.INFO:
            return <FireIcon className="h-4 w-4"/>
        default:
            break;
    }
}

export function CustomToast({ toastData, deleteToast }) {
    return (
        toastData.map((data, index) => {
            const { variant, message, active } = data;
            if (active === false)
                return null
            return (
                <div key={index} className="mb-2 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow">
                    <div className="flex p-3 items-center">
                        <div className={IconColors[variant]}>
                            {IconRenderer(variant)}
                        </div>
                        <div className="ml-2 text-sm font-normal">
                            {message}
                        </div>
                        <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" aria-label="Close" onClick={() => deleteToast({index})}>
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                    <ProgressBar className="bottom-0" category={variant}/>
                </div>
            )
        })
    );
}