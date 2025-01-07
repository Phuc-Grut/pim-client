import styled from "styled-components"
const TableUseHookForm = styled.div`

  table {
    table-layout: fixed;
    width: 100%;
  }

  thead, tbody, tr, td, th { 
    display: block; 
  }

  tr:after {
    content: ' ';
    display: block;
    visibility: hidden;
    clear: both;
  }
  
  tbody {
    //max-height: 180px;
    overflow-y: scroll;
  }

  thead {
    padding-right: 17px;
  }


  tbody td, thead td {
    float: left;
    overflow: hidden;
    border-right: 1px solid #CCCCCC;
    .cell {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  tbody td {
    height: 36px;
  } 
  thead td {
    height: 30px;
  }
  tbody tr{
    border-bottom: 1px solid #CCCCCC;
    td{
      border-bottom: 0 !important;
      min-height: 20px;
    }
  }
`
export default TableUseHookForm