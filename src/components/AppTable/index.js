import React, { useMemo } from "react";
import moment from "moment";
import {
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  IconButton,
  Stack,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  ViewIcon,
  EditIcon,
  DeleteIcon,
  HamburgerIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import Card from "../card/Card";
import Menu from "../menu/MainMenu";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

export default function AppTable(props) {
  const {
    columnsData,
    tableData,
    tableTitle = "",
    isMenu = false,
    isAddButton = false,
    handleAddButton = "",
    onView,
    onEdit,
    onDelete,
    onMore,
    showAction = false,
  } = props;

  // Add SN and Actions columns dynamically
  const columns = useMemo(() => {
    const actionColumn = {
      Header: "ACTIONS",
      accessor: "actions",
      label: "ACTIONS",
      Cell: ({ row }) => (
        <Flex>
          {onView && (
            <IconButton
              icon={<ViewIcon />}
              size="sm"
              onClick={() => onView(row.original, "VIEW")}
              aria-label="View"
            />
          )}
          {onEdit && (
            <IconButton
              icon={<EditIcon />}
              size="sm"
              onClick={() => onEdit(row.original, "EDIT")}
              aria-label="Edit"
            />
          )}
          {onDelete && (
            <IconButton
              icon={<DeleteIcon />}
              size="sm"
              onClick={() => onDelete(row.original, "DELETE")}
              aria-label="Delete"
            />
          )}
          {onMore && (
            <IconButton
              icon={<HamburgerIcon />}
              size="sm"
              onClick={() => onMore(row.original, "MORE")}
              aria-label="More"
            />
          )}
        </Flex>
      ),
    };

    return [
      {
        Header: "SN",
        accessor: (_, rowIndex) => rowIndex + 1,
        label: "SN",
      },
      ...columnsData,
      ...(showAction ? [actionColumn] : []),
    ];
  }, [columnsData, onView, onEdit, onDelete, onMore]);

  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 5 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex, pageSize },
  } = tableInstance;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("secondaryGray.500", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const headerBgColor = useColorModeValue("gray.50", "gray.700");
  const rowHoverColor = useColorModeValue("gray.100", "gray.600");
  const alternateRowColor = useColorModeValue("gray.50", "gray.700");

  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          {tableTitle}
        </Text>
        {isMenu && <Menu />}
        {isAddButton && handleAddButton && (
          <Button
            h="44px"
            mb="10px"
            variant="outline"
            // colorScheme="blue"
            onClick={handleAddButton}
          >
            ADD MORE
          </Button>
        )}
      </Flex>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead bg={headerBgColor}>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe="10px"
                  key={index}
                  borderColor={borderColor}
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >
                    {column.label}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <Tr
                {...row.getRowProps()}
                key={rowIndex}
                _hover={{ bg: rowHoverColor }}
                bg={rowIndex % 2 === 0 ? alternateRowColor : "transparent"}
              >
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "NAME") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "DATE") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {moment(cell.value).format("YYYY-MM-DD")}
                      </Text>
                    );
                  } else if (cell.column.Header === "SN") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {rowIndex + 1 + pageIndex * pageSize}
                      </Text>
                    );
                  } else if (cell.column.Header === "STATUS") {
                    const cellProps = cell.render("Cell");
                    const value =
                      cellProps.props.cell.row.values[cell.column.id];
                    data = (
                      <Stack direction="row">
                        <Badge colorScheme={value === 1 ? "green" : "red"}>
                          {value === 1 ? "Active" : "Inactive"}
                        </Badge>
                      </Stack>
                    );
                  } else if (cell.column.Header === "ACTIONS") {
                    data = cell.render("Cell");
                  } else {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Flex justify="space-between" align="center" px="25px" mb="20px">
        <Text fontSize="sm">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </Text>
        <Flex>
          <IconButton
            onClick={previousPage}
            isDisabled={!canPreviousPage}
            icon={<ChevronLeftIcon />}
            aria-label="Previous Page"
            size="sm"
            mr="2"
          />
          <IconButton
            onClick={nextPage}
            isDisabled={!canNextPage}
            icon={<ChevronRightIcon />}
            aria-label="Next Page"
            size="sm"
          />
        </Flex>
      </Flex>
    </Card>
  );
}
