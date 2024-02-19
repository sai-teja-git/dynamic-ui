import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
// DnD
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  rectIntersection,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import Row from './row/Row';
import Col from './col/Col';
import FieldDraggable from '../../pages/user-pages/form-constructor/FieldDraggable';


type DNDType = {
  id: UniqueIdentifier;
  title: string;
  items: {
    id: UniqueIdentifier;
    title: string;
    colspan: number;
  }[];
};

export default function FormBuilder() {
  const [rows, setRows] = useState<DNDType[]>([]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [overId, setOverId] = useState<UniqueIdentifier|null|undefined>(null);
  const [currentContainerId, setCurrentContainerId] =
    useState<UniqueIdentifier>();
  const [containerName, setContainerName] = useState('');
  const [columns, setColumns] = useState('');
  // const [showAddRowModal, setAddRowModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  const onAddContainer = () => {
    // if (!containerName) return;
    const id = `row-${uuidv4()}`;
    setRows([
      ...rows,
      {
        id,
        title: containerName,
        items: [],
      },
    ]);
    setContainerName('');
    // setAddRowModal(false);
  };

  useEffect(() => {
    setRows([{
      id: `row-${uuidv4()}`,
      title: 'parent',
      items: []
    }])
  }, [])

  const onAddItem = (uid: UniqueIdentifier | null = activeId) => {
    // if (!columns) return;
    console.log(uid, "uid");

    const id = `column-${uuidv4()}`;
    const row = rows.find((row) => row.id === uid);
    console.table(rows);
    console.log(currentContainerId);

    if (!row) return;
    const currentRow = row;
    let modifiedColSpan = 12;
    if (currentRow.items.length > 0) {
      modifiedColSpan = Math.round(12 / row.items.length);
      // alert(`${12 % row.items.length} - ${row.items.length} - ${(12 % row.items.length) == 0}`)
      if ((12 % row.items.length) != 0 && row.items.length > 12) {
        return
      }
      row.items = row.items.map((item) => { item['colspan'] = modifiedColSpan; return item })
    }
    row.items.push({
      id,
      title: columns,
      colspan: modifiedColSpan
    });

    console.table(rows);

    setRows([...rows]);
    setColumns('');
    // setShowAddItemModal(false);
  };

  // Find the value of the items
  function findValueOfItems(id: UniqueIdentifier | undefined, type: string) {
    if (type === 'row') {
      return rows.find((column) => column.id === id);
    }
    if (type === 'column') {
      return rows.find((row) =>
        row.items.find((column) => column.id === id),
      );
    }
  }

  const findItemTitle = (id: UniqueIdentifier | undefined) => {
    const row = findValueOfItems(id, 'column');
    if (!row) return '';
    const column = row.items.find((column) => column.id === id);
    if (!column) return '';
    return column.title;
  };
  const findItem = (id: UniqueIdentifier | undefined) => {
    const row = findValueOfItems(id, 'column');
    if (!row) return null;
    const column = row.items.find((column) => column.id === id);
    if (!column) return null;
    return column;
  };

  const findContainerTitle = (id: UniqueIdentifier | undefined) => {
    const row = findValueOfItems(id, 'row');
    if (!row) return '';
    return row.title;
  };

  const findContainerItems = (id: UniqueIdentifier | undefined) => {
    const row = findValueOfItems(id, 'row');
    if (!row) return [];
    return row.items;
  };

  // DND Handlers
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  }

  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event;




    // Handle Col Sorting
    if (
      active.id.toString().includes('column') &&
      over?.id.toString().includes('column') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active row and over row
      const activeContainer = findValueOfItems(active.id, 'column');
      const overContainer = findValueOfItems(over.id, 'column');

      console.log(activeContainer, overContainer);


      // If the active or over row is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over row
      const activeContainerIndex = rows.findIndex(
        (row) => row.id === activeContainer.id,
      );
      const overContainerIndex = rows.findIndex(
        (row) => row.id === overContainer.id,
      );

      // Find the index of the active and over column
      const activeitemIndex = activeContainer.items.findIndex(
        (column) => column.id === active.id,
      );
      const overitemIndex = overContainer.items.findIndex(
        (column) => column.id === over.id,
      );
      // In the same row
      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...rows];
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeitemIndex,
          overitemIndex,
        );

        newItems[activeContainerIndex].items = newItems[activeContainerIndex].items.map((item) => { item.colspan = Math.round(12 / newItems[activeContainerIndex].items.length); return item });
        newItems[overContainerIndex].items = newItems[overContainerIndex].items.map((item) => { item.colspan = Math.round(12 / newItems[overContainerIndex].items.length); return item });


        setRows(newItems);
      } else {
        // In different rows
        let newItems = [...rows];
        const [removeditem] = newItems[activeContainerIndex].items.splice(
          activeitemIndex,
          1,
        );
        newItems[overContainerIndex].items.splice(
          overitemIndex,
          0,
          removeditem,
        );

        newItems[activeContainerIndex].items = newItems[activeContainerIndex].items.map((item) => { item.colspan = Math.round(12 / newItems[activeContainerIndex].items.length); return item });
        newItems[overContainerIndex].items = newItems[overContainerIndex].items.map((item) => { item.colspan = Math.round(12 / newItems[overContainerIndex].items.length); return item });

        setRows(newItems);
      }
    }

    // Handling Item Drop Into a Row
    if (
      active.id.toString().includes('column') &&
      over?.id.toString().includes('row') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over row
      const activeContainer = findValueOfItems(active.id, 'column');
      const overContainer = findValueOfItems(over.id, 'row');

      // If the active or over row is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over row
      const activeContainerIndex = rows.findIndex(
        (row) => row.id === activeContainer.id,
      );
      const overContainerIndex = rows.findIndex(
        (row) => row.id === overContainer.id,
      );

      // Find the index of the active and over column
      const activeitemIndex = activeContainer.items.findIndex(
        (column) => column.id === active.id,
      );

      // Remove the active column from the active row and add it to the over row
      let newItems = [...rows];
      const [removeditem] = newItems[activeContainerIndex].items.splice(
        activeitemIndex,
        1,
      );
      newItems[overContainerIndex].items.push(removeditem);

      newItems[activeContainerIndex].items = newItems[activeContainerIndex].items.map((item) => { item.colspan = Math.round(12 / newItems[activeContainerIndex].items.length); return item });
      newItems[overContainerIndex].items = newItems[overContainerIndex].items.map((item) => { item.colspan = Math.round(12 / newItems[overContainerIndex].items.length); return item });

      setRows(newItems);
    }
  };

  // This is the function that handles the sorting of the rows and items when the user is done dragging.
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setOverId(over?.id);

    console.log(event, activeId);

    if (active.id.toString().includes('grid') && over?.id.toString().includes('add')) {
      $("#exampleModal").modal("show")
    }

    if (active.id.toString().includes('parent') && over?.id.toString().includes('row')) {
      const activeContainer = findValueOfItems(over.id, 'row');

      if (!activeContainer) return;
      setCurrentContainerId(over.id);
      $("#exampleModal").modal("show")
      return;
    }


    // Handling Row Sorting
    if (
      active.id.toString().includes('row') &&
      over?.id.toString().includes('row') &&
      active &&
      over &&
      active.id !== over.id
    ) {

      // Find the index of the active and over row
      const activeContainerIndex = rows.findIndex(
        (row) => row.id === active.id,
      );
      const overContainerIndex = rows.findIndex(
        (row) => row.id === over.id,
      );


      // Swap the active and over row
      let newItems = [...rows];
      newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);
      newItems[activeContainerIndex].items = newItems[activeContainerIndex].items.map((item) => { item.colspan = Math.round(12 / newItems[activeContainerIndex].items.length); return item });
      newItems[overContainerIndex].items = newItems[overContainerIndex].items.map((item) => { item.colspan = Math.round(12 / newItems[overContainerIndex].items.length); return item });

      setRows(newItems);
    }

    // Handling column Sorting
    if (
      active.id.toString().includes('column') &&
      over?.id.toString().includes('column') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over row
      const activeContainer = findValueOfItems(active.id, 'column');
      const overContainer = findValueOfItems(over.id, 'column');

      // If the active or over row is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over row
      const activeContainerIndex = rows.findIndex(
        (row) => row.id === activeContainer.id,
      );
      const overContainerIndex = rows.findIndex(
        (row) => row.id === overContainer.id,
      );
      // Find the index of the active and over column
      const activeitemIndex = activeContainer.items.findIndex(
        (column) => column.id === active.id,
      );
      const overitemIndex = overContainer.items.findIndex(
        (column) => column.id === over.id,
      );

      // In the same row
      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...rows];
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeitemIndex,
          overitemIndex,
        );

        newItems[activeContainerIndex].items = newItems[activeContainerIndex].items.map((item) => { item.colspan = Math.round(12 / newItems[activeContainerIndex].items.length); return item });

        setRows(newItems);
      } else {
        // In different rows
        let newItems = [...rows];
        const [removeditem] = newItems[activeContainerIndex].items.splice(
          activeitemIndex,
          1,
        );
        newItems[overContainerIndex].items.splice(
          overitemIndex,
          0,
          removeditem,
        );

        newItems[activeContainerIndex].items = newItems[activeContainerIndex].items.map((item) => { item.colspan = Math.round(12 / newItems[activeContainerIndex].items.length); return item });
        newItems[overContainerIndex].items = newItems[overContainerIndex].items.map((item) => { item.colspan = Math.round(12 / newItems[overContainerIndex].items.length); return item });

        setRows(newItems);
      }
    }
    // Handling column dropping into Row
    if (
      active.id.toString().includes('column') &&
      over?.id.toString().includes('row') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over row
      const activeContainer = findValueOfItems(active.id, 'column');
      const overContainer = findValueOfItems(over.id, 'row');

      // If the active or over row is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over row
      const activeContainerIndex = rows.findIndex(
        (row) => row.id === activeContainer.id,
      );
      const overContainerIndex = rows.findIndex(
        (row) => row.id === overContainer.id,
      );
      // Find the index of the active and over column
      const activeitemIndex = activeContainer.items.findIndex(
        (column) => column.id === active.id,
      );

      let newItems = [...rows];
      const [removeditem] = newItems[activeContainerIndex].items.splice(
        activeitemIndex,
        1,
      );
      newItems[overContainerIndex].items.push(removeditem);
      setRows(newItems);
    }
    // setActiveId(null);
  }

  const elementConfirmation = () => {

    if (activeId?.toString().includes('grid') && overId?.toString().includes('add')) {
      onAddContainer();
    } else if (activeId?.toString().includes('parent')) {
      onAddItem(currentContainerId);
    } else {
      onAddItem()
    }
    $("#exampleModal").modal("hide");
    setActiveId(null)
  }

  const field_list = [
    { name: "Input", type: "input", component: "parent", id: 'parent-001', title: 'Input', element_type: 'parent' },
    { name: "Text", type: "text_area", component: "parent", id: 'parent-002', title: 'Input', element_type: 'parent' },
    { name: "Dropdown", type: "dropdown", component: "parent", id: 'parent-003', title: 'Input', element_type: 'parent' },
  ];

  const grid_list = [
    { name: "Row", type: "input", component: "container", id: 'grid-001', title: 'Input', element_type: 'grid' },
    { name: "Col", type: "text_area", component: "container", id: 'gird-002', title: 'Input', element_type: 'gird' },
  ];


  return (
    <>
      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to add.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={elementConfirmation}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <p className="h3">Form</p>
        <DndContext
          sensors={sensors}
          collisionDetection={rectIntersection}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
        >

          <div className="col-3">
            <div className="row">
              <div className="col-12">
                <p className="h3">Inputs</p>
                <div className="field-list">
                  {field_list.map(field => (
                    <div className="field-to-select" key={field.type}>
                      <FieldDraggable field={field}></FieldDraggable>
                    </div>
                  ))}
                </div>

              </div>
              <div className="col-12">
                <p className="h3 mt-3">Grid</p>
                <div className="field-list">
                  {grid_list.map(field => (
                    <div className="field-to-select" key={field.type}>
                      <FieldDraggable field={field}></FieldDraggable>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>

          <div className="form-set col-9">


            <SortableContext items={rows.map((i) => i.id)}>
              {rows.map((row) => (
                <Row
                  id={row.id}
                  title={row.title}
                  key={row.id}
                  onAddItem={() => {
                    // setShowAddItemModal(true);
                    setCurrentContainerId(row.id);
                    setCurrentContainerId(row.id)
                    onAddItem(row.id)
                  }}
                >
                  <SortableContext items={row.items.map((i) => i.id)}>
                    <>
                      {row.items.map((i) => (
                        <Col title={i.title} id={i.id} key={i.id} colSpan={i.colspan} />
                      ))}
                    </>
                  </SortableContext>
                </Row>
              ))}
              <Row
                id={'add'}
                title={'row.title'}
                key={'add-item'}
                onAddItem={() => {
                  // setShowAddItemModal(true);
                  // setCurrentContainerId(row.id);
                  // setCurrentContainerId(row.id)
                  // onAddItem(row.id)
                  // return void
                }}
                children={undefined}
              />

            </SortableContext>
            <DragOverlay adjustScale={false}>
              {/* Drag Overlay For column Item */}
              {activeId}
              {activeId && activeId.toString().includes('column') && (
                <Col id={activeId} title={findItemTitle(activeId)} colSpan={findItem(activeId)?.colspan} />
              )}
              {/* Drag Overlay For Row */}
              {activeId && activeId.toString().includes('row') && (
                <Row id={activeId} title={findContainerTitle(activeId)}>
                  {findContainerItems(activeId).map((i) => (
                    <Col key={i.id} title={i.title} id={i.id} colSpan={i.colspan} />
                  ))}
                </Row>
              )}
            </DragOverlay>
          </div>
        </DndContext>
      </div>
    </>
  );
}