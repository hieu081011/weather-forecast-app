import { BsFillSunFill,BsFillCloudDrizzleFill,BsFillCloudsFill } from "react-icons/bs"
export const colorDisplay =[
    {
        name: 'rainy',
        background:'./assets/background/rainy.jpg',
        buttonColor: '#829F9A',
        icon:<BsFillCloudDrizzleFill/>
    },
    {
        name:'cloudy',
        background:'./assets/background/cloudy.jpg',
        buttonColor: '#D66C05',
        icon:<BsFillCloudsFill/>
    },
    {
        name:'sunny',
        background:'./assets/background/sunny.jpg',
        buttonColor:'#AACDE1',
        icon:<BsFillSunFill/>
    }

]