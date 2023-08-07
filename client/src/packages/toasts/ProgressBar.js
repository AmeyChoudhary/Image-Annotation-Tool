import {useState,useEffect} from "react";
import {Progress} from "flowbite-react"
const ProgressBar=(props)=>{
    const category = props.category
    const [filled, setFilled]=useState(100);
	const [isRunning, setIsRunning]=useState(false);
    const handleColor=()=>{
        switch (category) {
            case 'warning':
                return "yellow"
            case 'error':
                return 'red'
            case 'success':
                return 'green'
            case 'info':
                return 'blue'    
            default:
                return ''
        }
    }
    const pgColor = handleColor()
	useEffect(() => {
        setIsRunning(true);
		if (filled > 0 && isRunning) {
			setTimeout(() => setFilled(prev => prev -= 2), 90)
		}
	},[filled, isRunning])
    return (
        <Progress className="h-1"
            progress={filled}
            size="sm"
            color={pgColor}
        />
    );
}
export default ProgressBar