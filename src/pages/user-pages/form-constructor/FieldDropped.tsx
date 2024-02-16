import { useDroppable } from "@dnd-kit/core"
import { Dropdown, Multiselect } from "../../../components/inputs";

export default function FieldDropped(props: { selected_fields: any[] }) {
    const { setNodeRef } = useDroppable({
        id: "field-droppable"
    });

    const values_to_render = props.selected_fields.map((field, index) => {
        if (field['type'] == "multiselect") {
            return <div className="form-field" key={`${field.type}-${index}`}>
                <Multiselect {...field} className="form-control" />
            </div>
        } else if (field['type'] == "dropdown") {
            return <div className="form-field" key={`${field.type}-${index}`}>
                <Dropdown {...field} className="form-control"/>
            </div>

        }
        else {
            return <div className="form-field" key={`${field.type}-${index}`}>
                <input {...field} className="form-control" />  </div>
        }
    })

    return (
        <>
            <div className="form-set" ref={setNodeRef}>
                {/* {props.selected_fields.map((item, ind) => (
                    <div className="form-field" key={`${item.type}-${ind}`}>
                        {item.type === 'input' &&
                            <div className="form-group" >
                                <input type="text" className="form-control" />
                            </div>
                        }
                        {item.type === 'text_area' &&
                            <div className="form-group" >
                                <textarea name="" id="" cols={30} rows={2} className="form-control" ></textarea>
                            </div>
                        }
                    </div>
                ))} */}
                {values_to_render}
            </div>
        </>
    )
}
