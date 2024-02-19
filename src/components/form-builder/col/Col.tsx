import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ItemsType = {
  id: UniqueIdentifier;
  title: string;
  colSpan?: number
};

const Col = ({ id, title, colSpan = 1 }: ItemsType) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: 'item',
    },
  });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={`col-${colSpan}`}
      {...listeners}
    >
      <div className='row'>
        <div className="col-12 mb-3">
          <label form="exampleFormControlInput1" className="form-label">Email address</label>
          <input key={id} type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
        </div>
      </div>

    </div>
  );
};

export default Col;