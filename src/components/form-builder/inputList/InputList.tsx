import { SortableContext } from "@dnd-kit/sortable";
import { Dropdown } from "../../inputs";


const InputList = (props:any) => {


    const inputs = [
        {
            type: 'text',
            element: (props:any) =>  <input {...props}/>,
        },
        {
            type: 'dropdown',
            element: (props: any) => <Dropdown {...props}></Dropdown>
        }
    ]




    return <>
       <SortableContext {...props}>
        { inputs.map((input) => input.element({}))}
       </SortableContext>
    </>
}

export default InputList;