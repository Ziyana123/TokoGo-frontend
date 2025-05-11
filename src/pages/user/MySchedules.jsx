import React, { useEffect, useState } from "react";
import axios from "../../axiosInstance";
import { toast } from 'react-toastify';
import { CircleLoader } from 'react-spinners'; 

const MySchedules = () => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSchedules = async () => {
        try {
            const res = await axios.get("/schedule/my-schedules", { withCredentials: true });
            setSchedules(res.data);
        } catch (error) {
            console.error("Error fetching schedules", error);
            toast.error("Failed to fetch scheduled deliveries.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSchedules();
    }, []);

    const cancelSchedule = async (id) => {
        if (!window.confirm("Are you sure you want to cancel this schedule?")) return;

        try {
            await axios.put(`/schedule/cancel/${id}`, {}, { withCredentials: true });
            toast.success("Schedule canceled.");
            fetchSchedules();
        } catch (error) {
            console.error("Cancel error:", error);
            toast.error("Failed to cancel schedule.");
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">My Scheduled Deliveries</h2>

            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <CircleLoader color="#4A90E2" loading={loading} size={50} />
                </div>
            ) : schedules.length === 0 ? (
                <p className="text-center text-gray-500">You have no scheduled deliveries yet.</p>
            ) : (
                <div className="space-y-6">
                    {schedules.map((schedule) => (
                        <div key={schedule._id} className="border rounded-lg p-6 shadow-lg bg-white transition-all hover:shadow-2xl">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4 break-words">
                                <div className="flex-1">
                                    <p className="text-xl font-semibold text-gray-800">Status: 
                                        <span className={`ml-2 px-3 py-1 rounded-full text-white 
                                            ${schedule.status === "Scheduled" ? "bg-yellow-500" : "bg-green-500"}`}>
                                            {schedule.status}
                                        </span>
                                    </p>
                                </div>
                                <p className="text-sm text-gray-500">
                                    Scheduled For: {new Date(schedule.scheduledDate).toLocaleString()}
                                </p>
                            </div>

                            <p className="text-lg text-gray-700"><strong>Delivery Address:</strong> {schedule.deliveryAddress}</p>

                            <div className="mt-4">
                                <strong className="text-gray-700">Items:</strong>
                                <ul className="list-disc pl-6 text-gray-600">
                                    {schedule.items.map((item, idx) => (
                                        <li key={idx} className="text-sm">
                                            {item.productId?.name || "Product"} – Qty: {item.quantity}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {schedule.status === "Scheduled" && (
                                <button
                                    onClick={() => cancelSchedule(schedule._id)}
                                    className="mt-4 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg transition duration-200"
                                >
                                    Cancel Delivery
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MySchedules;
