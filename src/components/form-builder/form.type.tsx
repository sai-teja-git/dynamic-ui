import { UniqueIdentifier } from '@dnd-kit/core';

export default interface FormProps {
  id: UniqueIdentifier;
  children: React.ReactNode;
  title?: string;
  description?: string;
  onAddItem?: () => void;
}