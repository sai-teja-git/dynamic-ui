import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities"

export default function FruitDraggable(props: { children: string }) {

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.children,
        data: { title: props.children }
    })

    return (
        <div className="fruit-details" ref={setNodeRef} style={{ transform: CSS.Translate.toString(transform) }}
            {...attributes} {...listeners}>
            {props.children}
        </div>
    )
}
