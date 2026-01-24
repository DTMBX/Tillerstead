"""
Calculator module initialization
Import all calculators to register them
"""
from app.calculators.base import CalculatorRegistry, BaseCalculator
from app.calculators.tile_floor import TileFloorCalculator
from app.calculators.thinset_mortar import ThinsetMortarCalculator
from app.calculators.drywall_compound import DrywallCompoundCalculator

# Premium Integrated Calculators - THE MAIN ATTRACTIONS
from app.calculators.integrated_tile import IntegratedTileProjectCalculator

# Premium calculators
from app.calculators.premium_tile import (
    LargeFormatTileCalculator,
    ShowerPanLinerCalculator,
)

# NJ Compliance calculators
from app.calculators.nj_compliance import (
    NJHICContractCalculator,
    NJSalesTaxCalculator,
)

# NJ Contractor Professional Tools
from app.calculators.nj_contractor_tools import (
    NJPermitEstimator,
    CompetitiveBidAnalyzer,
    SeasonalPricingOptimizer,
)

# Categories and organization
from app.calculators.categories import (
    CalculatorCategory,
    CalculatorGroup,
    get_calculator_badge,
    get_calculator_search_terms,
)

__all__ = [
    "CalculatorRegistry",
    "BaseCalculator",
    # Integrated calculators
    "IntegratedTileProjectCalculator",
    # Individual calculators
    "TileFloorCalculator",
    "ThinsetMortarCalculator", 
    "DrywallCompoundCalculator",
    "LargeFormatTileCalculator",
    "ShowerPanLinerCalculator",
    # NJ Compliance
    "NJHICContractCalculator",
    "NJSalesTaxCalculator",
    # NJ Professional Tools
    "NJPermitEstimator",
    "CompetitiveBidAnalyzer",
    "SeasonalPricingOptimizer",
    # Organization
    "CalculatorCategory",
    "CalculatorGroup",
    "get_calculator_badge",
    "get_calculator_search_terms",
]
