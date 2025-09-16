import React, { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";

import { format } from "date-fns"; // Correct import
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

import { Calendar } from "primereact/calendar";

import { Tag } from "primereact/tag";
import { ActionIcon, SegmentedControl, Text, TextInput } from "@mantine/core";
import { IconEdit, IconSearch, IconTrash } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { errorNotification,successNotification } from "../../../Util/NotificationUtil";
import { Toolbar } from "primereact/toolbar";
import { getAppointmentsByDoctor ,cancelAppointment} from "../../../Service/AppoitmentService";
import { modals } from "@mantine/modals";


interface Appointment {
  id: number;
  doctorId: number;
  doctorName: string;
  patientId: number;
  patientName: string;
  appointmentTime: string;
  reason: string;
  notes: string;
  status: string;
}

const Appointments = () => {
  const [selectedAppointments, setSelectedAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const user = useSelector((state: any) => state.user);
  const [tab,setTab]=useState("Today")


  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    doctorName: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    appointmentTime: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  });
  
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const [statuses] = useState<string[]>(["SCHEDULED", "COMPLETED", "CANCELLED"]);

  const getSeverity = (status: string) => {
    switch (status) {
      case "CANCELLED":
        return "danger";
      case "COMPLETED":
        return "success";
      case "SCHEDULED":
        return "info";
      default:
        return null;
    }
  };

  useEffect(() => {
    // Fetch appointments
    getAppointmentsByDoctor(user.profileId)
      .then((data: Appointment[]) => {
        console.log("Appointments data:", data);
        setAppointments(data);
      })
      .catch((err) => {
        console.error("Error fetching appointments", err);
        errorNotification("Failed to load appointments");
      });
    
  }, [user.profileId]);


  const formatDateTime = (value: string) => {
    try {
      return format(new Date(value), "MMM dd, yyyy hh:mm a");
    } catch (error) {
      return value;
    }
  };

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters: any = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex flex-wrap gap-2 justify-between items-center">

        <TextInput
          leftSection={<IconSearch />}
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Search appointments..."
        />
      </div>
    );
  };

  const statusBodyTemplate = (rowData: Appointment) => {
    return (
     <Tag 
      value={rowData.status} 
      severity={getSeverity(rowData.status)}
      key={rowData.id} // Unique key based on status
    />
    )
  };

  const statusFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e: DropdownChangeEvent) =>
          options.filterCallback(e.value, options.index)
        }
        itemTemplate={statusItemTemplate}
        placeholder="Select Status"
        className="p-column-filter"
        showClear
      />
    );
  };

  const statusItemTemplate = (option: string) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };

  const timeTemplate = (rowData: Appointment) => {
    return <span>{formatDateTime(rowData.appointmentTime)}</span>;
  };

  
const handleDelete = (rowData: Appointment) => {
  modals.openConfirmModal({
    title: 'Cancel Appointment',
    children: (
      <Text size="sm">
        Are you sure you want to cancel this appointment with Dr. {rowData.doctorName} 
        scheduled for {formatDateTime(rowData.appointmentTime)}?
      </Text>
    ),
    labels: { confirm: 'Confirm Cancellation', cancel: 'Keep Appointment' },
    confirmProps: { color: 'red' },
    onCancel: () => console.log('Cancellation cancelled'),
    onConfirm: () => {
      setLoading(true);
      cancelAppointment(rowData.id)
        .then((response) => {
          successNotification("Appointment cancelled successfully");
          
          // Update only the status of the specific appointment
          setAppointments(prevAppointments => 
            prevAppointments.map(appointment => 
              appointment.id === rowData.id 
                ? { ...appointment, status: "CANCELLED" }
                : appointment
            )
          );
        })
        .catch((err) => {
          console.error("Failed to cancel appointment:", err);
          errorNotification(err.response?.data?.errorMessage || "Failed to cancel appointment");
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });
};

  const actionBodyTemplate = (rowData:Appointment) => {
    return <div className="flex gap-2">
      <ActionIcon>
        <IconEdit size={20} stroke={1.5}/>
      </ActionIcon>
      <ActionIcon color="red" onClick={()=>handleDelete(rowData)}>
        <IconTrash size={20} stroke={1.5}/>
      </ActionIcon>
    </div>
  };

  const header = renderHeader();


    const rightToolbarTemplate = () => {
        return <TextInput
          leftSection={<IconSearch />}
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Search appointments..."
        />
    };
     const centerToolbarTemplate = () => {
        return <SegmentedControl
      value={tab}
      variant="filled"
      color="primary"
      onChange={setTab}
      data={["Today","Upcoming","Past"
      ]}
    />
    };

    const filterAppointment=appointments.filter((appointment)=>{
      const appointmentDate=new Date(appointment.appointmentTime);
      const today=new Date();
      if(tab==='Today'){
        return appointmentDate.toDateString()===today.toDateString()
      }else if(tab==="Upcoming"){
        return appointmentDate > today;
      }else if(tab==='Past'){
        return appointmentDate < today;
      }
    })

  return (
    <div className="card">
     <Toolbar className="mb-4" start={centerToolbarTemplate} end={rightToolbarTemplate}></Toolbar>
      <DataTable
        value={filterAppointment}
        paginator
        rows={10}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[10, 25, 50]}
        dataKey="id"
        selectionMode="checkbox"
        selection={selectedAppointments}
        onSelectionChange={(e) => {
          const selected = e.value as Appointment[];
          setSelectedAppointments(selected);
        }}
        filters={filters}
        filterDisplay="menu"
        globalFilterFields={["doctorName", "status"]}
        emptyMessage="No appointments found."
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        loading={loading}
      >
      
        <Column
          field="patientName"
          header="Patient"
          sortable
          filter
          filterPlaceholder="Search by patient"
          style={{ minWidth: "14rem" }}
        />
        <Column
          field="patientPhone"
          header="Phone No."
          style={{ minWidth: "14rem" }}
        />
        <Column
          field="appointmentTime"
          header="Appointment Time"
          sortable
          style={{ minWidth: "14rem" }}
          body={timeTemplate}
          filter
          filterField="appointmentTime"
          dataType="date"
          filterElement={(options) => (
            <Calendar
              value={options.value}
              onChange={(e) => options.filterCallback(e.value, options.index)}
              dateFormat="mm/dd/yy"
              placeholder="mm/dd/yyyy"
              mask="99/99/9999"
            />
          )}
        />
        <Column
          field="reason"
          header="Reason"
          sortable
          filter
          filterPlaceholder="Search by reason"
          style={{ minWidth: "14rem" }}
        />
        <Column
          field="status"
          header="Status"
          sortable
          filterMenuStyle={{ width: "14rem" }}
          style={{ minWidth: "12rem" }}
          body={statusBodyTemplate}
          filter
          filterElement={statusFilterTemplate}
        />
        <Column
          header="Actions"
          headerStyle={{ width: "8rem", textAlign: "center" }}
          bodyStyle={{ textAlign: "center", overflow: "visible" }}
          body={actionBodyTemplate}
        />
      </DataTable>
      
    </div>
  );
};

export default Appointments;