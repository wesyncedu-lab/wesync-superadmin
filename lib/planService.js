let plansDB = [
  { name: "Free", price: "₹0", schools: 1, active: true },
  { name: "Standard", price: "₹999/month", schools: 3, active: true },
  { name: "Premium", price: "₹2499/month", schools: 10, active: false },
];

export function getPlans() {
  return plansDB;
}

export function getPlanByIndex(index) {
  return plansDB[index];
}

export function savePlan(plan) {
  plansDB.push(plan);
}

export function updatePlan(index, updatedPlan) {
  plansDB[index] = updatedPlan;
}

export function deletePlan(index) {
  plansDB.splice(index, 1);
}
