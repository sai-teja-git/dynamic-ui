import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities"

export default function FieldDraggable(props: { field: any }) {


    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.field.type,
        data: { data: props.field }
    })


    return (
        <div className="field-dragging" ref={setNodeRef} style={{ transform: CSS.Translate.toString(transform) }}
            {...attributes} {...listeners}>
            {props.field.name}
        </div>
    )
}
