import 'package:flutter/widgets.dart';

class Responsive {
  static double scale(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    // 375 = base iPhone width (design baseline)
    return width / 375;
  }

  static double font(BuildContext context, double size) {
    return size * scale(context);
  }

  static double height(BuildContext context, double size) {
    return size * scale(context);
  }

  static double width(BuildContext context, double size) {
    return size * scale(context);
  }
}
