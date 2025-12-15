import { TableBody, TableRow, TableCell, Dialog, DialogTitle, DialogContent } from '@mui/material'
import React from 'react'
import Table, { ColumnData } from '@/components/Table'
import { useClassStore } from '@/zustand/stores/ClassStore'
import LoadingScreen from '@/components/LoadingScreen'
import dayjs from 'dayjs'

export default function StudentListTable({ open, onClose, classId }: { open: boolean, onClose: () => void, classId: string }) {
  const columns: ColumnData[] = [
    {
      label: 'Học sinh',
      dataKey: 'fullName',
      align: 'center',
    },
    {
      label: 'Ngày duyệt',
      dataKey: 'approvedAt',
      align: 'center',
      render: (value: unknown) => {
        return <div className="text-center">{dayjs(value as string).format('DD/MM/YYYY')}</div>
      }
    },
  ]

  const { loading, getListStudentofClass } = useClassStore();
  const [data, setData] = React.useState<any[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      const result = await getListStudentofClass(classId);
      setData(result);
      console.log(111, result);
    }
    if (open) {
      fetchData();
    }
  }, [classId, getListStudentofClass, open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth className='bg-white h-[600px] overflow-y-auto'>
      <DialogTitle>Danh sách học sinh</DialogTitle>
      <DialogContent className='h-[600px] overflow-y-auto'>
        {loading ? (
          <LoadingScreen />
        ) : data.length > 0 ? (
          <Table columns={columns} data={data} />
        ) : (
          <div className="text-center py-8 text-gray-500">Không có học sinh nào</div>
        )}
      </DialogContent>
    </Dialog>
  );
}