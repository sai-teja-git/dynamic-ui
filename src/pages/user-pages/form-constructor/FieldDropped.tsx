import { useDroppable } from "@dnd-kit/core"

export default function FieldDropped(props: { selected_fields: any[] }) {
    const { setNodeRef } = useDroppable({
        id: "field-droppable"
    })
    return (
        <>
            <div className="form-set" ref={setNodeRef}>
                {props.selected_fields.map((item, ind) => (
                    <div className="field-selected" key={`${item}-${ind}`}>
                        {item.name}
                    </div>
                ))}
            </div>
        </>
    )
}
