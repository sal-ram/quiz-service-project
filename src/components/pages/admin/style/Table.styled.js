import { Table } from '@mui/material';
import { styled } from '@mui/system';

export const StyledTable = styled(Table)(({
    "&.styled-table": {
        borderCollapse: 'collapse',
        width: '100%',
        '& td, & th': {
            border: '1px solid #000',
            padding: '12px 24px',
            borderBottom: "none",
        },
        '& td': {
            borderTop: "none",
            borderBottom: "none"
        },
        '& td p': {
            padding: 0
        },
        '& th': {
            backgroundColor: '#fff',
            fontWeight: 'bold',
            textAlign: 'left',
        },
        '& .grey-row': {
            backgroundColor: '#f2f2f2',
        },
        '& .points': {
            textAlign: 'right',
        },
        '& .question': {
            textAlign: 'center',
        }
    },
}));
