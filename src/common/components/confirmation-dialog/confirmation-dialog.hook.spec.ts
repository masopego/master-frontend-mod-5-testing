import { act, renderHook } from '@testing-library/react-hooks';
import { createEmptyLookup, Lookup } from 'common/models';
import { useConfirmationDialog } from 'common/components/confirmation-dialog';

describe('confirmation-dialog-hook', () => {
  it('should return default values', () => {
    const { result } = renderHook(() => useConfirmationDialog());
    const emptyItemToDelete = createEmptyLookup();

    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toEqual(emptyItemToDelete);
    expect(result.current.onAccept).toEqual(expect.any(Function));
    expect(result.current.onClose).toEqual(expect.any(Function));
    expect(result.current.onOpenDialog).toEqual(expect.any(Function));
  });

  it('should set isOpen and itemToDelete when call OnOpenDialog(item)', () => {
    const item: Lookup = {
      id: '8750',
      name: 'item_test',
    };

    const { result } = renderHook(() => useConfirmationDialog());

    expect(result.current.onOpenDialog).toBeInstanceOf(Function);
    act(() => result.current.onOpenDialog(item));
    expect(result.current.isOpen).toBe(true);
    expect(result.current.itemToDelete).toEqual(item);
  });

  it('should set !isOpen when call onClose function and isOpen === true previously', () => {
    const item: Lookup = {
      id: '8750',
      name: 'item_test',
    };

    const { result } = renderHook(() => useConfirmationDialog());

    expect(result.current.onClose).toBeInstanceOf(Function);
    act(() => {
      result.current.onOpenDialog(item);
      result.current.onClose();
    });

    expect(result.current.isOpen).toBe(false);
  });
});
