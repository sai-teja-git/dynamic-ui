import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { UniqueIdentifier } from '@dnd-kit/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons/faEllipsisVertical';

export interface ContainerProps {
  id: UniqueIdentifier;
  children: React.ReactNode;
  title?: string;
  description?: string;
  onAddItem?: () => void;
}

const Row = ({
  id,
  children,
  title,
  description,
  onAddItem,
}: ContainerProps) => {
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: 'container',
    },
  });
  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
        height: 200
      }}

      className='row border border-1 rounded my-4'
    >
      <div className="col-11">
        <span {...listeners}>
          <FontAwesomeIcon icon={faEllipsisVertical} className='fs-3 align-middle' />
        </span>
        <div className='row'>
          {children}
        </div>
      </div>


      {/* <div className="col-11 d-flex align-items-center">
        <div className="flex-shrink-0 border-end py-3 px-1" {...listeners}>
        <FontAwesomeIcon icon={faEllipsisVertical} className='fs-3 align-middle' />
        </div>
        <div className="flex-grow-1 ms-3 row">
        {children}
        </div>
      </div> */}
      {/* <button className='btn btn-primary btn-sm mx-auto col-1' onClick={onAddItem}>
        Add coloum
      </button> */}
    </div>
  );
};

export default Row;