import { useRef, useState } from "react";
import $ from "jquery";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import FieldDraggable from "./FieldDraggable";
import FieldDropped from "./FieldDropped";
import { v4 as uuidv4 } from "uuid";


export default function FormConstructor() {

    const field_list = [
        { name: "Input", type: "input" },
        { name: "Text", type: "text_area" },
        { name: "Dropdown", type: "dropdown" },
    ]

    let [selected_fields, setSelectedField] = useState<any[]>([])

    function addFieldToList(e: DragEndEvent) {
        console.log("heree", e)
        const newItem = e.active.data.current?.data;
        if (e.over?.id !== "field-droppable" || !newItem) return;
        selected_fields.push(newItem)
        setSelectedField(selected_fields);
    };

    // const modalRef = useRef()

    function openModal(id: string) {
        $("#exampleModal").modal("show")
        // $("#exampleModal").addClass("show")
        // document.getElementById(id)?.setAttribute("aria-hidden", "false")
        // $("#exampleModal").show()
    }

    function openCanvas() {
        console.log("clicked")
        $("#offcanvasExample").offcanvas("show")
    }

    return (
        <>
            <DndContext onDragEnd={addFieldToList}>
                <div className="row">
                    <div className="col-3">
                        <div className="field-list">
                            {field_list.map(field => (
                                <div className="field-to-select" key={field.type}>
                                    <FieldDraggable field={field}></FieldDraggable>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-9">
                        <FieldDropped selected_fields={selected_fields}></FieldDropped>
                    </div>
                </div>
            </DndContext>

            {/* <div className="dropdown" >
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButtonDark" data-bs-toggle="dropdown" aria-expanded="false">
                    Dark dropdown
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButtonDark">
                    <li><a className="dropdown-item active" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                    <li><a className="dropdown-item" href="#">Separated link</a></li>
                </ul>
            </div> */}

            {/* <button type="button" className="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button> */}
            <button type="button" className="btn btn-primary mt-3" onClick={() => openModal("exampleModalLabel")}>
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <button className="btn btn-primary" type="button" onClick={openCanvas}>
                Button with data-bs-target
            </button> */}

            <div className="offcanvas offcanvas-start" tabIndex={-1} key="offcanvasExample" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div>
                        Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
                    </div>
                    <div className="dropdown mt-3">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                            Dropdown button
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
