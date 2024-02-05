import { useDroppable } from "@dnd-kit/core"

export default function FieldDropped(props: { selected_fields: any[] }) {
    const { setNodeRef } = useDroppable({
        id: "field-droppable"
    })
    return (
        <>
            <div className="form-set" ref={setNodeRef}>
                {props.selected_fields.map((item, ind) => (
                    <div className="form-field" key={`${item.type}-${ind}`}>

                        {item.type === 'input' &&
                            <div className="form-group" >
                                <input type="text" className="form-control" />
                            </div>
                        }
                    </div>
                    // <div className="field-selected" key={`${item.type}-${ind}`}>
                    //     {item.name}
                    // </div>
                ))}
            </div>
        </>
    )
}
