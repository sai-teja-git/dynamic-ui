import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities"
import { v4 as uuidv4 } from "uuid";

export default function FieldDraggable(props: { field: any }) {

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: uuidv4(),
        data: props.field
    })

    return (
        <div className="field-draggable" ref={setNodeRef} style={{ transform: CSS.Translate.toString(transform) }}
            {...attributes} {...listeners}>
            {props.field.name}
        </div>
    )
}
