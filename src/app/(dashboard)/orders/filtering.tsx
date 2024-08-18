import { Table } from '@tanstack/react-table';
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

export function TableFilters<TData>({ table }: { table: Table<TData> }) {
  return (
    <div className='flex gap-4 my-4'>
      <Input
        placeholder='Filter by service name...'
        value={(table.getColumn('service')?.getFilterValue() as string) ?? ''}
        onChange={(event) => {
          table.getColumn('service')?.setFilterValue(event.target.value);
        }}
        className=''
      />
      <Input
        placeholder='Filter by user email...'
        value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
        onChange={(event) =>
          table.getColumn('email')?.setFilterValue(event.target.value)
        }
        className=''
      />
      <Select
        onValueChange={(value) => {
          table
            .getColumn('status')
            ?.setFilterValue(value == 'NONE' ? '' : value);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder='Filter by status' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='NONE'>None</SelectItem>
            <SelectItem value='PENDING'>Pending</SelectItem>
            <SelectItem value='COMPLETED'>Completed</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
