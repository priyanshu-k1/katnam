document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dataForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        let amount = 0;

        // Collecting form values
        const name = formData.get('name')?.toLowerCase() || "You";
        const age = parseInt(formData.get('age')) || 0;
        const education = formData.get('education')?.toLowerCase() || "";
        const qualification = formData.get('qualification')?.toLowerCase() || "";
        const salary = formData.get('salary') || "";
        const properties = formData.getAll('properties') || [];
        const caste = formData.get('caste')?.toLowerCase() || "";
        const category = formData.get('category')?.toLowerCase() || "";

        // AGE
        if (age < 18) {
            alert("You must be 18 or older to apply.");
            return;
        } else if (age >= 21 && age <= 28) amount += 400000;
        else if (age > 28 && age <= 35) amount += 150000;
        else if (age > 35 && age <= 45) amount += 50000;

        // EDUCATION
        switch (education) {
            case "10": amount += 100000; break;
            case "12": amount += 200000; break;
            case "ug": amount += 500000; break;
            case "pg": amount += 800000; break;
            default: amount += 0; break;
        }

        // QUALIFICATION
        if (["btech", "mtech", "mbbs", "mba", "ca", "cs", "phd", "law"].some(q => qualification.includes(q))) {
            amount += 1000000;
        } else if (["bca", "bsc", "bcom", "ba", "msc", "ma", "mca"].some(q => qualification.includes(q))) {
            amount += 500000;
        }

        // SALARY
        const salaryNum = parseFloat(salary);
        if (!salaryNum || salaryNum <= 0) amount += 0;
        else if (salaryNum <= 5) amount += 200000;
        else if (salaryNum <= 20) amount += 500000;
        else if (salaryNum <= 40) amount += 1000000;
        else amount += 1500000;

        // PROPERTIES
        const propertyValues = {
            none: 0,
            land: 300000,
            flat: 200000,
            house: 300000,
            commercial: 400000,
            agricultural: 350000,
            plot: 150000,
            villa: 500000,
            duplex: 400000,
            farmhouse: 450000,
            industrial: 600000,
            warehouse: 300000,
            shop: 250000,
            garage: 100000,
            car: 100000,
            business: 500000,
            other: 50000
        };

        properties.forEach(item => {
            const key = item.toLowerCase();
            if (propertyValues[key]) {
                amount += propertyValues[key];
            }
        });

        // CASTE (lower caste gets more)
        if (["sc", "st"].includes(caste)) amount += 500000;
        else if (["obc", "bc"].includes(caste)) amount += 200000;
        else if (["reddy", "brahmin", "kamma", "kapu"].includes(caste)) amount += 100000;

        // CATEGORY
        if (["sc", "st"].includes(category)) amount += 300000;
        else if (["obc", "bc"].includes(category)) amount += 150000;
        else if (["general", "oc"].includes(category)) amount += 50000;
        console.log("Amount: ", amount);
        // Redirect to result page with amount as query param
        window.location.href = `result.html?amount=${amount}&name=${encodeURIComponent(name)}`;
    });
});
