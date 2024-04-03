import React from "react";

const Createform = () => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-xl lg:max-w-2xl">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">New Lead</h2>
            <hr className="mb-4" />
            <form method="post" action="#"  className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Add Leads</h3>
                    <p className="text-gray-500 text-sm mb-4">Add details such as name, phone number, date and project.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name:</label>
                            <input type="text" name="leadName" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter campaign name" required="" />
                        </div>
                        <div>
                            <label for="job_title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Title:</label>
                            <input type="text" name="job_title" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter campaign description" required="" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label for="mobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile</label>
                            <input type="text" name="mobile" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter campaign name" required="" />
                        </div>
                        <div>
                            <label for="whatsappNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Whatsapp:</label>
                            <input type="text" name="whatsappNo" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter campaign description" required="" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Source:</label>
                            <input type="text" name="leadName" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter campaign name" required="" />
                        </div>
                        <div>
                            <label for="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date:</label>
                            <input type="text" name="lead_date" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter campaign description" required="" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name:</label>
                            <input type="text" name="leadName" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter campaign name" required="" />
                        </div>
                        <div>
                            <label for="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date:</label>
                            <input type="text" name="lead_date" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter campaign description" required="" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name:</label>
                            <input type="text" name="leadName" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter campaign name" required="" />
                        </div>
                        <div>
                            <label for="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date:</label>
                            <input type="text" name="lead_date" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter campaign description" required="" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name:</label>
                            <input type="text" name="leadName" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter campaign name" required="" />
                        </div>
                        <div>
                            <label for="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date:</label>
                            <input type="text" name="lead_date" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter campaign description" required="" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name:</label>
                            <input type="text" name="leadName" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter campaign name" required="" />
                        </div>
                        <div>
                            <label for="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date:</label>
                            <input type="text" name="lead_date" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter campaign description" required="" />
                        </div>
                    </div>
                <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone:</label>
                            <input type="text" name="phoneNumber" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter campaign name" required="" />
                        </div>
                        <div>
                            <label for="project" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project:</label>
                            <input type="text" name="project" id="project" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter campaign description" required="" />
                        </div>
                    </div>
                </div>              
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                        <div>
                            <label for="campaign" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Campaign:</label>
                            <input type="text" name="campaign" id="revenue" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="e.g:100,000,000" required="" />
                        </div>
                        <div>
                            <label for="cost" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lead Cost:</label>
                            <input type="cost" name="lead_cost" id="cost" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="e.g:10,000,000" required="" />
                        </div>
                    </div>
                </div>
                <input type="submit" value="Add Campaign" className="inline-flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" />
            </form>
        </div>
    </section>
    </>   
  );
};

export default Createform;
