const monthYear = document.getElementById("month-year");
      const calendarBody = document.querySelector("#calendar tbody");
      const pastCountDisplay = document.getElementById("past-count");
      const prevBtn = document.getElementById("prev-month");
      const nextBtn = document.getElementById("next-month");

      let currentDate = new Date();

      function generateCalendar(year, month) {
          calendarBody.innerHTML = "";
          let pastCount = 0;
          const firstDay = new Date(year, month, 1).getDay();
          const daysInMonth = new Date(year, month + 1, 0).getDate();
          const today = new Date();
          today.setHours(0, 0, 0, 0); // Reset today’s time for accurate comparison

          monthYear.textContent = ${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year};

          let row = document.createElement("tr");
          for (let i = 0; i < firstDay; i++) {
              row.appendChild(document.createElement("td"));
          }

          for (let day = 1; day <= daysInMonth; day++) {
              let date = new Date(year, month, day);
              date.setHours(0, 0, 0, 0); // Reset date time for proper comparison

              let cell = document.createElement("td");
              cell.textContent = day;

              // Count past dates only for the currently displayed month
              if (date.getTime() < today.getTime() && month === today.getMonth() && year === today.getFullYear()) {
                  cell.classList.add("past");
                  pastCount++;
              }

              row.appendChild(cell);

              if ((firstDay + day) % 7 === 0) {
                  calendarBody.appendChild(row);
                  row = document.createElement("tr");
              }
          }

          if (row.children.length > 0) {
              calendarBody.appendChild(row);
          }

          pastCountDisplay.textContent = pastCount; // Display count for the current month only
      }

      prevBtn.addEventListener("click", () => {
          currentDate.setMonth(currentDate.getMonth() - 1);
          generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
      });

      nextBtn.addEventListener("click", () => {
          currentDate.setMonth(currentDate.getMonth() + 1);
          generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
      });

      generateCalendar(currentDate.getFullYear(), currentDate.getMonth());