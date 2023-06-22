// @ts-nocheck

const postDataToApi = async (data) => {
    const url = "https://rubybackend-rgegurmvca-as.a.run.app/Users";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("POST request succeeded:", jsonResponse);
      } else {
        throw new Error("Error while processing the request");
      }
    } catch (error) {
      console.error("POST request failed:", error);
    }
  };

export default postDataToApi