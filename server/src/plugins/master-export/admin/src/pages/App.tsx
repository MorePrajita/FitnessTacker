import { useState } from "react";

export const App = () => {
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    user: "",
    status: "",
    contentType: "",
  });

  const onChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onExport = async () => {
    const params = new URLSearchParams(filters).toString();
    const res = await fetch(`/api/master-export/export?${params}`, {
      method: "GET",
      credentials: "include",
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "master-export.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Master Export</h1>
      <input name="from" placeholder="From date" onChange={onChange} />
      <input name="to" placeholder="To date" onChange={onChange} />
      <input name="user" placeholder="User ID" onChange={onChange} />
      <input name="status" placeholder="Status" onChange={onChange} />
      <input name="contentType" placeholder="Content type" onChange={onChange} />
      <button onClick={onExport}>Export</button>
    </div>
  );
};