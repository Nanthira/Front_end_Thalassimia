import React from "react";

export default function Confirm() {
  // ฟังก์ชันสำหรับปิดแท็บเบราว์เซอร์
  const handleCloseTab = () => {
    window.close();
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.icon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="green"
            width="80px"
            height="80px"
          >
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.707 16.293l-4-4a1 1 0 011.414-1.414L11 13.586l5.293-5.293a1 1 0 011.414 1.414l-6 6a1 1 0 01-1.414 0z" />
          </svg>
        </div>
        <p style={styles.text}>ยืนยันออเดอร์สำเร็จ</p>
        <button style={styles.button} onClick={handleCloseTab}>
          ปิดหน้าต่าง
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
    margin: 0,
  },
  content: {
    textAlign: "center",
  },
  icon: {
    marginBottom: "20px",
  },
  text: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
