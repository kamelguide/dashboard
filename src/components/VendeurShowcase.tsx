import { useState, useEffect } from "react";
import { BarChart3, Package, Users, LineChart, ShoppingCart, FileText, Home, LogOut, Settings, Search, Filter, Plus, Check, Calendar, TrendingUp, Star, ArrowUp, ArrowDown, Eye, Edit } from "lucide-react";
import logo from "../assets/images/icon.png";

export default function VendeurShowcase() {
  const [activeScreen, setActiveScreen] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);

    setTimeout(() => {
      setAnimationComplete(true);
    }, 5000);

    const interval = setInterval(() => {
      setActiveScreen(current => {
        if (current === "dashboard") return "clients";
        if (current === "clients") return "products";
        if (current === "products") return "invoice";
        return "dashboard";
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const screens = {
    dashboard: (
      <div className="p-4 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
              <p className="text-gray-600 text-sm">Vue d'ensemble de votre activité commerciale</p>
            </div>
            <div className="flex items-center space-x-1">
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                En ligne
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 rounded-xl md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white transform hover:scale-102 transition-all duration-200 shadow-md hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">73,72 DT</p>
                  <div className="flex items-center mt-1">
                    <ArrowUp size={14} className="mr-1" />
                  </div>
                </div>
                <div className="bg-blue-400/30 rounded-md p-2">
                  <TrendingUp size={20} />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white transform hover:scale-102 transition-all duration-200 shadow-md hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-xs font-medium">Clients actifs</p>
                  <p className="text-2xl font-bold mt-1">47</p>
                  <div className="flex items-center mt-1">
                    <ArrowUp size={14} className="mr-1" />
                    <span className="text-xs">+3 nouveaux</span>
                  </div>
                </div>
                <div className="bg-green-400/30 rounded-md p-2">
                  <Users size={20} />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white transform hover:scale-102 transition-all duration-200 shadow-md hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-xs font-medium">Produits</p>
                  <p className="text-2xl font-bold mt-1">156</p>
                  <div className="flex items-center mt-1">
                    <Package size={14} className="mr-1" />
                    <span className="text-xs">En stock</span>
                  </div>
                </div>
                <div className="bg-purple-400/30 rounded-md p-2">
                  <Package size={20} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Balance Comptable</h2>
                <div className="bg-blue-50 p-1.5 rounded-md">
                  <BarChart3 className="text-blue-500" size={18} />
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-lg p-3 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-800 font-medium text-sm">Total facturé (TTC)</span>
                    <span className="text-xl font-bold text-blue-600">783,72 DT</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100/50 rounded-lg p-3 border border-green-200">
                  <div className="flex items-center justify-between">
                    <span className="text-green-800 font-medium text-sm">Total payé</span>
                    <span className="text-xl font-bold text-green-600">0,00 DT</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-red-100/50 rounded-lg p-3 border border-red-200">
                  <div className="flex items-center justify-between">
                    <span className="text-red-800 font-medium text-sm">Reste à payer</span>
                    <span className="text-xl font-bold text-red-600">783,72 DT</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Générateur d'états</h2>
                <div className="bg-yellow-50 p-1.5 rounded-md">
                  <Calendar className="text-yellow-500" size={18} />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 text-xs bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-all duration-200 hover:scale-102">Jour</button>
                  <button className="px-3 py-1.5 text-xs bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-all duration-200 hover:scale-102">Semaine</button>
                  <button className="px-4 py-1.5 text-xs bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-sm hover:scale-102">Mois</button>
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="text-xs font-medium text-gray-700 block mb-1">Filtrer par client</label>
                    <select className="w-full p-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 text-sm">
                      <option>Tous les clients</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-1">Du</label>
                      <div className="flex items-center space-x-1 p-2 rounded-lg bg-gray-50 border border-gray-200">
                        <Calendar size={14} className="text-gray-500" />
                        <span className="text-xs text-gray-600">20/07/2025</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-1">Au</label>
                      <div className="flex items-center space-x-1 p-2 rounded-lg bg-gray-50 border border-gray-200">
                        <Calendar size={14} className="text-gray-500" />
                        <span className="text-xs text-gray-600">19/08/2025</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Aperçu des factures</h2>
              <button className="text-blue-500 hover:text-blue-600 text-xs font-medium flex items-center">
                Voir tout <ArrowUp className="ml-1 rotate-45" size={12} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
                <div className="text-gray-500 text-xs mb-1">Total</div>
                <div className="text-2xl font-bold text-gray-800">581,223</div>
                <div className="text-xs text-gray-500 mt-1">DT</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                <div className="text-green-600 text-xs mb-1">Payé</div>
                <div className="text-2xl font-bold text-green-600">0,000</div>
                <div className="text-xs text-green-500 mt-1">DT</div>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
                <div className="text-red-600 text-xs mb-1">Reste</div>
                <div className="text-2xl font-bold text-red-600">581,223</div>
                <div className="text-xs text-red-500 mt-1">DT</div>
              </div>
            </div>
          </div>
        </div>
    ),
    
    clients: (
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500 p-2 rounded-xl">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
              <p className="text-gray-600">Gérez votre portefeuille clients</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Search className="h-5 w-5 text-gray-500" />
            </button>
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:scale-105">
              <Plus className="h-4 w-4" />
              <span>Nouveau</span>
            </button>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Rechercher un client..." 
            className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 shadow-sm"
          />
        </div>
        
        <div className="grid gap-4">
          <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer group">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  RN
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-bold text-gray-900">Rieb Nuira</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-gray-300" />
                  </div>
                </div>
                <div className="space-y-1 mt-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📧</span>
                    <span>rieb.nuira@gmail.com</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📱</span>
                    <span>+216234260437</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📍</span>
                    <span>Sousse Sahloul</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">Particulier</div>
                  <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-lg">Actif</div>
                </div>
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye size={16} className="text-blue-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <Edit size={16} className="text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer group" style={{animationDelay: "0.1s"}}>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  BK
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-bold text-gray-900">Bouain Kamel</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                </div>
                <div className="space-y-1 mt-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📧</span>
                    <span>kamel.bouain8@gmail.com</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📱</span>
                    <span>29345178</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📍</span>
                    <span>Goret Jwan</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">Particulier</div>
                  <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-lg">Actif</div>
                </div>
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye size={16} className="text-blue-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <Edit size={16} className="text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    
    products: (
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-500 p-2 rounded-xl">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Produits</h1>
              <p className="text-gray-600">Gérez votre catalogue produits</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="h-5 w-5 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Filter className="h-5 w-5 text-gray-500" />
            </button>
            <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:scale-105">
              <Plus className="h-4 w-4" />
              <span>Nouveau</span>
            </button>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Rechercher un produit..." 
            className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-200 shadow-sm"
          />
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                T
              </div>
              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">En stock</div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-xl font-bold text-gray-900">T-SHIRT Sport</h3>
                <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs font-medium">PR-8965</div>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2 bg-orange-50 px-3 py-1 rounded-full">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  <span className="text-sm font-medium text-orange-700">Vêtement</span>
                </div>
                <div className="flex items-center space-x-2 bg-pink-50 px-3 py-1 rounded-full">
                  <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                  <span className="text-sm font-medium text-pink-700">T-shirt sport</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div>
                  <div className="text-3xl font-bold text-gray-900">40,50 <span className="text-lg text-gray-600">DT</span></div>
                  <div className="text-sm text-gray-500">Prix unitaire HT</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-700">Stock: 10 unités</span>
                  </div>
                  <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-lg">
                    TVA: 0,00%
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
                <Eye size={18} className="text-blue-500" />
              </button>
              <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                <Edit size={18} className="text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    ),
    
    invoice: (
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-green-500 p-2 rounded-xl">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
              <p className="text-gray-600">Gérez vos devis et factures</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Search className="h-5 w-5 text-gray-500" />
            </button>
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:scale-105">
              <Plus className="h-4 w-4" />
              <span>Nouveau</span>
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
          <button className="px-6 py-3 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-md">Devis</button>
          <button className="px-6 py-3 text-sm text-gray-600 rounded-lg hover:bg-gray-50 transition-all duration-200">Livraison</button>
          <button className="px-6 py-3 text-sm text-gray-600 rounded-lg hover:bg-gray-50 transition-all duration-200">Sortie</button>
          <button className="px-6 py-3 text-sm text-gray-600 rounded-lg hover:bg-gray-50 transition-all duration-200">Facture</button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Rechercher un devis..." 
            className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent transition-all duration-200 shadow-sm"
          />
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
              📄
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900">DEV-20250812-0001</h3>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 text-xs bg-gradient-to-r from-green-100 to-green-200 text-green-800 rounded-full font-medium border border-green-300">✓ Validé</span>
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                      <Eye size={16} className="text-blue-500" />
                    </button>
                    <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit size={16} className="text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Date de création</span>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">12/08/2025</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Client</span>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">Rieb Nuira</div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Montant total</span>
                  <span className="text-xl font-bold text-gray-900">1,245.50 DT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className=" bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
              
                <div>
                  <img src={logo} className="w-32" />
                  <p className="text-sm text-gray-600">Solution de gestion commerciale</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                E
                  </div>
                  <div>
                    <div className="font-medium">example</div>
                    <div className="text-xs text-gray-500">example@gmail.com</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex">
            <div className="w-62 bg-white border-r border-gray-200">
              <div className="p-6 space-y-2">
                <div className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 ${activeScreen === "dashboard" ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-[1.02]" : "text-gray-600 hover:bg-gray-50 hover:scale-[1.01]"}`} onClick={() => setActiveScreen("dashboard")}>
                  <Home size={20} className="mr-4" />

                  <div className="flex-1">
                                      <div className="font-medium">tableau</div>

                  </div>
                </div>
                
                <div className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 ${activeScreen === "clients" ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-[1.02]" : "text-gray-600 hover:bg-gray-50 hover:scale-[1.01]"}`} onClick={() => setActiveScreen("clients")}>
                  <Users size={20} className="mr-4" />
                  <div className="flex-1">
                    <div className="font-medium">Clients</div>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${activeScreen === "clients" ? "bg-green-400/30" : "bg-gray-100 text-gray-600"}`}>
                    47
                  </div>
                </div>
                
                <div className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 ${activeScreen === "products" ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg transform scale-[1.02]" : "text-gray-600 hover:bg-gray-50 hover:scale-[1.01]"}`} onClick={() => setActiveScreen("products")}>
                  <Package size={20} className="mr-4" />
                  <div className="flex-1">
                    <div className="font-medium">Produits</div>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${activeScreen === "products" ? "bg-purple-400/30" : "bg-gray-100 text-gray-600"}`}>
                    156
                  </div>
                </div>
                
                <div className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 ${activeScreen === "invoice" ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transform scale-[1.02]" : "text-gray-600 hover:bg-gray-50 hover:scale-[1.01]"}`} onClick={() => setActiveScreen("invoice")}>
                      <ShoppingCart size={20} className="mr-4" />
                  <div className="flex-1">
                    <div className="font-medium">bons</div>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${activeScreen === "invoice" ? "bg-orange-400/30" : "bg-gray-100 text-gray-600"}`}>
                    23
                  </div>
                </div>
                
                <div className="pt-6 mt-6 border-t border-gray-200">
                  <div className="space-y-2">
                  
                    
                    <div className="flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:scale-[1.01]">
                      <Users size={20} className="mr-4" />
                      <div className="flex-1">
                        <div className="font-medium">Fournisseurs</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 text-red-500 hover:bg-red-50 hover:scale-[1.01] group">
                  <LogOut size={20} className="mr-4" />
                  <span className="font-medium">Déconnexion</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 bg-gray-50 min-h-[700px] relative overflow-hidden">
              {loading ? (
                <div className="h-[700px] flex items-center justify-center">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200"></div>
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent absolute top-0"></div>
                    <div className="mt-4 text-center">
                      <p className="text-gray-600 font-medium">Chargement...</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-[700px] overflow-y-auto">
                  {screens[activeScreen]}
                </div>
              )}
            </div>
          </div>
        </div>
        
        
     
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}