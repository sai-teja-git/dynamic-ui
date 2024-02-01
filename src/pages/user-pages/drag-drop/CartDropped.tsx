import { useDroppable } from "@dnd-kit/core";

export default function CartDropped(props: { items: string[] }) {
    const { setNodeRef } = useDroppable({
        id: "cart-droppable"
    })
    return (
        <>
            <div className="fruits-list" ref={setNodeRef}>
                <div className="fruits">
                    {props.items.map((item, ind) => (
                        <div className="fruit-details" key={`${item}-${ind}`}>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}