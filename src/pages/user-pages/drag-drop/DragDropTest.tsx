import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { useState } from "react";
import CartDropped from "./CartDropped";
import FruitDraggable from "./FruitDraggable";

export default function DragDropTest() {

    const fruits = ["Apple", "Banana", "Guava", "Pear", "Mango"];
    const [selected_fruits, setCartItems] = useState<string[]>(["test"])

    function addItemsToCart(e: DragEndEvent) {
        const newItem = e.active.data.current?.title;
        if (e.over?.id !== "cart-droppable" || !newItem) return;
        const temp = [...selected_fruits];
        temp.push(newItem);
        setCartItems(temp);
    };

    return (
        <>
            <DndContext onDragEnd={addItemsToCart}>
                <div className="fruits-list">
                    <div className="title">Fruits</div>
                    <div className="fruits">
                        {fruits.map(item => (
                            <FruitDraggable key={item}>{item}</FruitDraggable>
                        ))}
                    </div>
                </div>
                <div className="cart-session">
                    <CartDropped items={selected_fruits} />
                </div>
            </DndContext>
        </>
    )
}
